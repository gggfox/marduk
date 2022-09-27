<script lang='ts'>
    import { onMount } from 'svelte';

    let canvas: HTMLCanvasElement;

    let playerX = 50;
    let playerY = 50;
    let playerSpeedX = 0;
    let playerSpeedY = 0;
    onMount(() => {
        const context = canvas.getContext('2d')

        function render() {
            if (context) {
            if(Math.abs(playerSpeedX) >= 10 && Math.abs(playerSpeedY) >= 10) {
                const cos45 = 0.7; 
                playerSpeedX *= cos45;
                playerSpeedY *= cos45;
            }
            playerX += playerSpeedX;
            playerY += playerSpeedY;
            

            context.clearRect(0,0,800,600)
            context.fillStyle = 'red';
            context.beginPath()
            context.arc(playerX, playerY, 50/2, 0, 360, false);
            context.fill()
            }
        }

        setInterval(() => {
            //update();
            render();
        }, 100)
    });

enum movement {
    up = 'w',
    down = 's',
    left = 'a',
    right = 'd',
}

function handleKeyPress(event: KeyboardEvent, speed: number) {
    if (event.key === movement.up) {
        playerSpeedY = -speed;
    }
    if (event.key === movement.down) {
        playerSpeedY = speed;
    }
    if (event.key === movement.left) {
        playerSpeedX = -speed;
    }
    if (event.key === movement.right) {
        playerSpeedX = speed;
    }
  }

  const handleKeyPressUp = (event: KeyboardEvent) => handleKeyPress(event, 0);
  const handleKeyPressDown = (event: KeyboardEvent) => handleKeyPress(event, 15);

</script>

<canvas id='screen' width='800' height='600' bind:this={canvas}/>
<svelte:window on:keydown={handleKeyPressDown} on:keyup={handleKeyPressUp}/>
