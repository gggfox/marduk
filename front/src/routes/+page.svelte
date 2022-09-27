<script lang="ts">
	import Counter from '$lib/Counter.svelte';
	import Header from '$lib/header/Header.svelte';
import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

	const socket = io('http://localhost:3003')
	let messages = [] as any
	let typers = new Set()

	onMount(async () => {
		socket.emit('findAllMessages', {}, (response: any) => {
			messages = response
		})

		socket.on('message', (message) => {
			messages.push(message);
			messages = messages;
		});

		socket.on('typing', ({name, isTyping}) => {
			if (isTyping) {
				typers.add(name)
			} else {
				typers.delete(name)
			}
			typers = typers
		});
	});

	let messageText = ''
	let joined = false
	const sendMessage = () => {
		socket.emit('createMessage', {name:name , text: messageText})
		messageText = ''
	}

	let name:any = ''
	function join() {
		socket.emit('join', { name: name}, (/*names*/) => {
			joined = true;
		})
	}

	let typingDisplay = ''
	let timeout
	function emitTyping() {
		socket.emit('typing', { isTyping: true });
		timeout = setTimeout(() => {
			socket.emit('typing', { isTyping: false })
		}, 4_000)
	}

	function ReturnValue(item: HTMLElement | HTMLInputElement | null): string {
		if(item instanceof HTMLInputElement) {
			return item.value
		}
		return '';
}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if !joined}
		<form on:submit={(e) => {
			e.preventDefault();
			const fullname = document.getElementById('fullname');
			name = ReturnValue(fullname);
			join()
		}}>
			<label for="fullname">whats your name</label>
			<input id='fullname' type='text' name='fullname'>
			<button type='submit'>send</button>
		</form>
	{:else}
		{name}
		<form on:submit={(e) => {
			e.preventDefault();
			const messagetxt = document.getElementById('msg');
			messageText = ReturnValue(messagetxt)
			sendMessage()	
		}}>
			<input id='msg' type='text' name='msg' bind:value={messageText} on:keydown={emitTyping}>
			<button type='submit'>send</button>
		</form>
	{/if}

	{#each messages as message}
			<div>		
				{message.name}:{message.text}
			</div>
		{:else}
			loading...
	{/each}
	
	{#each [...typers] as typer}
	<div>
		...{typer} is typing
	</div>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
