document.getElementById('send-button').addEventListener('click', async () => {
  const userInput = document.getElementById('user-input').value;
  if (userInput.trim() === '') return;

  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<p style="text-align:right;"><strong>You:</strong> ${userInput}</p>`;

  try {
    const response = await fetch('https://llama.us.gaianet.network/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama',
        messages: [
          { role: 'system', content: 'You are an AI twin of Silky Mahajan, a leading dietitian. You will answer queries about nutrition, diet planning, and overall health, particularly focusing on weight management and sports nutrition.' },
          { role: 'user', content: `The user asks: ${userInput}. Please analyze and provide a response.` },
        ],
      }),
    });

    const data = await response.json();
    chatBox.innerHTML += `<p><strong>Silky Mahajan:</strong> ${data.choices[0].message.content}</p>`;
  } catch (error) {
    chatBox.innerHTML += '<p><strong>Error:</strong> Unable to fetch the response.</p>';
  }

  document.getElementById('user-input').value = '';
});
