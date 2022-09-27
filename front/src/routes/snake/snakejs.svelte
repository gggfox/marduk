<script>
    function getRandomPosition() {
        return { 
            x: Math.floor(Math.random() * boardSize), 
            y: Math.floor(Math.random() * boardSize), 
        }
    }

    let applePosition = getRandomPosition();
    let snake = [getRandomPosition()]
    let lastMove = {x: 1, y: 0}
    let points = 0
    let gameOver = false
    let pause = false;
    const head = 0
    const boardSize = 9;
    const grid = Array(boardSize).fill(Array(boardSize))

    function isEatingApple() {
        return snake[head].x === applePosition.x && snake[head].y === applePosition.y;
    }

    function isInsideBoard ({x, y}) {
        return x < boardSize && x >= 0 && y < boardSize && y >= 0;
    } 

    function snakeIsntEatingItself() {
        const [snakeHead, _, ...rest] = [...snake];
        return rest.some((item) => item.x === snakeHead.x && item.y === snakeHead.y);
    }

    setInterval(() => {
        if (pause || gameOver) return;

        if(isEatingApple()) {
            points += 1000;
            snake.push(snake[snake.length-1])
            applePosition = getRandomPosition();
        }
        
        snake = snake.map((node, index) => {
            if(index !== head) {
                return snake[index-1];
            }
            return {
                x: node.x += lastMove.x,
                y: node.y += lastMove.y,
            }s
        });
        console.log(snake)
        pause ||= snakeIsntEatingItself()
        gameOver ||= snakeIsntEatingItself();
    }, 600)
            
      const handleKeyUp = ({key}) => { 
        pause = key === 'p';
        if(pause || gameOver) return;
        let keyToPosition = {
            'd': {x:  1, y:  0}, // right
            'a': {x: -1, y:  0}, // left
            'w': {x:  0, y: -1}, // up
            's': {x:  0, y:  1}, // down
        }
        const newMove = keyToPosition[key];
        const invalidMove = {x: lastMove.x * -1, y: lastMove.y * -1}
        const {x, y} = newMove.x !== invalidMove.x && newMove.y !== invalidMove.y ? newMove : lastMove;
        if(isInsideBoard(snake[head]) && !gameOver) {
            lastMove = {x, y};
        } else {
            gameOver = true
        }
      } 
</script>

<p>Points: {gameOver ? 'Game Over' : points }</p>
{#each grid as row, yIndex}
    <section class='row'>
        {#each row as _column, xIndex}
            {#if snake.some((item) => item.x === xIndex && item.y === yIndex)}
                <div class='snake'/> 
            {:else if xIndex === applePosition.x && yIndex === applePosition.y}
                <div class='apple'/>
            {:else}              
                <div/>
            {/if}
        {/each}
    </section>
{/each}
{#each snake as obj}
    <p>{obj.x},{obj.y}</p>
{/each}

<svelte:window on:keyup={handleKeyUp}/>
    
<style>
    div {
        padding: 1em;
        border-style: solid;
        border-width: 0.1em;
        background-color: black;
    }
    .row { display: flex; }
    .apple { background-color: crimson; }
    .snake { background-color: greenyellow; }
</style>