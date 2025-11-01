import { useState, useEffect, useRef, useCallback } from 'react';

// --- Constants ---
const CANVAS_WIDTH = window.innerWidth < 700 ? window.innerWidth - 40 : 600;
const CANVAS_HEIGHT = window.innerWidth < 700 ? (window.innerWidth - 40) * 0.6 : 400;
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 20;
const PADDLE_SPEED = 5; // Base speed for movement
const BALL_START_SPEED = 5;
const BOT_SPEED = PADDLE_SPEED * 0.7; // Bot speed is 70% of player speed for casual difficulty

// --- Initial States ---
const initialBallState = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, speedX: 0, speedY: 0 };
const initialPaddleState = { left: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, right: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 };

export default function Pong() {
    const [ball, setBall] = useState(initialBallState);
    const [paddles, setPaddles] = useState(initialPaddleState);
    const [gameOver, setGameOver] = useState(false);
    const [gameRunning, setGameRunning] = useState(false);
    const [winner, setWinner] = useState('');

    const canvasRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const botAimError = useRef(0);
    const isGracePeriod = useRef(true);
    const gracePeriodTimeout = useRef<NodeJS.Timeout | null>(null);

    // --- Bot AI Logic (Right Paddle) ---
    const updateBotPaddle = useCallback(() => {
        setPaddles((prev) => {
            let newRight = prev.right;
            const paddleCenterY = prev.right + PADDLE_HEIGHT / 2;

            // Target Y is the ball's Y-position plus the current error offset.
            const targetY = ball.y + botAimError.current;

            // Dead zone prevents bot from jittering around the target.
            const deadZone = PADDLE_HEIGHT / 3;

            if (paddleCenterY < targetY - deadZone) {
                newRight += BOT_SPEED;
            } else if (paddleCenterY > targetY + deadZone) {
                newRight -= BOT_SPEED;
            }

            // Clamp bot paddle to canvas bounds
            newRight = Math.max(Math.min(newRight, CANVAS_HEIGHT - PADDLE_HEIGHT), 0);

            return { ...prev, right: newRight };
        });
    }, [ball.y]); // Re-run when ball Y changes

    // --- Collision Logic (AABB Check) ---
    const checkCollision = useCallback((ballX: number, ballY: number, paddleY: number, isLeft: boolean) => {
        const ballTop = ballY - BALL_SIZE / 2;
        const ballBottom = ballY + BALL_SIZE / 2;
        const ballLeft = ballX - BALL_SIZE / 2;
        const ballRight = ballX + BALL_SIZE / 2;

        const paddleTop = paddleY;
        const paddleBottom = paddleY + PADDLE_HEIGHT;

        if (isLeft) {
            const paddleLeft = 0;
            const paddleRight = PADDLE_WIDTH;
            return ballLeft <= paddleRight &&
                ballRight >= paddleLeft &&
                ballTop <= paddleBottom &&
                ballBottom >= paddleTop;
        } else { // Right paddle
            const paddleLeft = CANVAS_WIDTH - PADDLE_WIDTH;
            const paddleRight = CANVAS_WIDTH;
            return ballRight >= paddleLeft &&
                ballLeft <= paddleRight &&
                ballTop <= paddleBottom &&
                ballBottom >= paddleTop;
        }
    }, []);

    // --- Game Loop ---
    const updateGame = useCallback(() => {
        if (!gameRunning) return;

        // Update the Bot's paddle position
        updateBotPaddle();

        // Update Ball position and check collisions
        setBall((prev) => {
            let newX = prev.x + prev.speedX;
            let newY = prev.y + prev.speedY;
            let newSpeedX = prev.speedX;
            let newSpeedY = prev.speedY;

            // Top and bottom wall collision
            if (newY - BALL_SIZE / 2 <= 0 || newY + BALL_SIZE / 2 >= CANVAS_HEIGHT) {
                newSpeedY = -newSpeedY;
                newY = newY - BALL_SIZE / 2 <= 0 ? BALL_SIZE / 2 : CANVAS_HEIGHT - BALL_SIZE / 2;
            }

            // Left (Player) paddle collision
            if (newSpeedX < 0 && checkCollision(newX, newY, paddles.left, true)) {
                newSpeedX = Math.abs(newSpeedX);
                newX = PADDLE_WIDTH + BALL_SIZE / 2; // Snap ball

                // Bot "re-evaluates" its aim (and gets it wrong) unless in grace period.
                if (!isGracePeriod.current) {
                    // Error range: +/- 40% of the paddle height
                    botAimError.current = (Math.random() - 0.5) * PADDLE_HEIGHT * 0.8;
                }
            }

            // Right (Bot) paddle collision
            if (newSpeedX > 0 && checkCollision(newX, newY, paddles.right, false)) {
                newSpeedX = -Math.abs(newSpeedX);
                newX = CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE / 2; // Snap ball
            }

            // Game over check
            if (newX - BALL_SIZE / 2 < 0) {
                setWinner('Franko');
                setGameOver(true);
                setGameRunning(false);
                return prev;
            }
            if (newX + BALL_SIZE / 2 > CANVAS_WIDTH) {
                setWinner('Player');
                setGameOver(true);
                setGameRunning(false);
                return prev;
            }

            return { x: newX, y: newY, speedX: newSpeedX, speedY: newSpeedY };
        });

        animationFrameId.current = requestAnimationFrame(updateGame);
    }, [gameRunning, paddles, updateBotPaddle, checkCollision]);

    // Effect to run the game loop (requestAnimationFrame)
    useEffect(() => {
        if (gameRunning) {
            animationFrameId.current = requestAnimationFrame(updateGame);
        }
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [gameRunning, updateGame]);

    // --- Mouse/Touch Controls (Left Paddle) ---
    useEffect(() => {
        const handleMove = (clientY: number) => {
            if (!canvasRef.current || !gameRunning) return;

            const rect = canvasRef.current.getBoundingClientRect();
            const relativeY = clientY - rect.top;

            // Center paddle on cursor/finger
            let newTop = relativeY - PADDLE_HEIGHT / 2;

            // Clamp paddle to canvas bounds
            newTop = Math.max(0, newTop);
            newTop = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, newTop);

            // Update the left paddle's state
            setPaddles(prev => ({ ...prev, left: newTop }));
        };

        const handleMouseMove = (e: MouseEvent) => {
            handleMove(e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            // Prevent scrolling on mobile
            e.preventDefault();
            if (e.touches.length > 0) {
                handleMove(e.touches[0].clientY);
            }
        };

        const canvasEl = canvasRef.current;
        if (canvasEl) {
            // Use window for mousemove for smoother control outside canvas area
            window.addEventListener('mousemove', handleMouseMove);
            // Use canvas for touchmove with passive: false to allow e.preventDefault()
            canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (canvasEl) {
                canvasEl.removeEventListener('touchmove', handleTouchMove);
            }
        };
    }, [gameRunning]);

    // --- Game State Functions ---
    const startGame = () => {
        if (gameRunning) return;

        if (gameOver) {
            restartGame(true); // Restart and auto-start
        } else {
            setGameRunning(true);
            setGameOver(false);

            // Start Grace Period (Bot has perfect aim for 3 seconds)
            if (gracePeriodTimeout.current) clearTimeout(gracePeriodTimeout.current);
            isGracePeriod.current = true;
            botAimError.current = 0;
            gracePeriodTimeout.current = setTimeout(() => {
                isGracePeriod.current = false;
            }, 3000);

            // Give ball a random starting velocity
            setBall(prev => ({
                ...prev,
                speedX: -BALL_START_SPEED,
                speedY: (Math.random() - 0.5) * BALL_START_SPEED, // Reset to 0.5 for full range
            }));
        }
    };

    const restartGame = (autoStart = false) => {
        setBall(initialBallState);
        setPaddles(initialPaddleState);
        setGameOver(false);
        setWinner('');
        setGameRunning(false);

        // Reset Grace Period logic
        if (gracePeriodTimeout.current) clearTimeout(gracePeriodTimeout.current);
        isGracePeriod.current = true;
        botAimError.current = 0;

        if (autoStart) {
            setGameRunning(true);

            // Start Grace Period timer after restart
            gracePeriodTimeout.current = setTimeout(() => {
                isGracePeriod.current = false;
            }, 3000);

            setBall(prev => ({
                ...prev,
                speedX: Math.random() > 0.5 ? BALL_START_SPEED : -BALL_START_SPEED,
                speedY: (Math.random() - 0.5) * BALL_START_SPEED,
            }));
        }
    };

    const pauseGame = () => {
        setGameRunning(false);
    };

    // --- JSX ---
    return (
        <div className="flex flex-col items-center justify-center ">
            {/* Game Canvas */}
            <div
                ref={canvasRef}
                className="relative bg-black outline-4 outline-offset-4 outline-yellow-500 rounded-lg cursor-none"
                style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }}
            >
                {/* Center Line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgb(234 179 8 / 0.3) 10px, rgb(234 179 8 / 0.3) 20px)' }}
                />

                {/* Left Paddle (Player) */}
                <div
                    className="absolute bg-yellow-500 rounded"
                    style={{
                        width: `${PADDLE_WIDTH}px`,
                        height: `${PADDLE_HEIGHT}px`,
                        left: '0px',
                        top: `${paddles.left}px`,
                    }}
                />

                {/* Right Paddle (Bot) */}
                <div
                    className="absolute bg-yellow-500 rounded transition-all duration-75"
                    style={{
                        width: `${PADDLE_WIDTH}px`,
                        height: `${PADDLE_HEIGHT}px`,
                        right: '0px',
                        top: `${paddles.right}px`,
                    }}
                />

                {/* Ball */}
                <div
                    className="absolute bg-white rounded-full shadow-lg shadow-white/50"
                    style={{
                        width: `${BALL_SIZE}px`,
                        height: `${BALL_SIZE}px`,
                        left: `${ball.x - BALL_SIZE / 2}px`,
                        top: `${ball.y - BALL_SIZE / 2}px`,
                    }}
                />

                {/* Game Over Overlay */}
                {gameOver && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center cursor-default">
                        <div className="text-5xl font-bold text-red-500 mb-4 animate-pulse">
                            GAME OVER
                        </div>
                        <div className="text-3xl font-semibold text-yellow-500 mb-6">
                            {winner} Wins!
                        </div>
                    </div>
                )}

                {/* Paused Overlay */}
                {!gameRunning && !gameOver && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-default">
                        <div className="text-3xl font-bold text-yellow-500 animate-pulse">
                            PAUSED
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex gap-4 mt-6">
                <button
                    accessKey='s'
                    onClick={startGame}
                    disabled={gameRunning}
                    className="px-5 bg-black border-2 border-yellow-500 text-white font-semibold rounded-4xl hover:bg-yellow-500/20 disabled:border-yellow-600/50 disabled:cursor-not-allowed transition-colors"
                >
                    &#9655; {/* Play icon */}
                </button>
                <button
                    accessKey='f'
                    onClick={pauseGame}
                    disabled={!gameRunning}
                    className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-4xl hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                    &#10073;&#10073; {/* Pause icon */}
                </button>
            </div>

            {/* Instructions */}
            <div className="mt-8 text-center text-gray-400 text-sm space-y-2">
                <div>
                    <span className="font-semibold text-yellow-500">Player:</span> Move mouse/finger up & down
                </div>
                <div>
                    brought to you by <span className="font-semibold text-yellow-500">Xyc &lt;3</span>
                </div>
            </div>
        </div>
    );
}