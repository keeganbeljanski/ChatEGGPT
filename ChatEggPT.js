document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
var picturesSent = []

function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;
    
    const messagesDiv = document.getElementById("messages");
    
    // Add user message
    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = message;
    messagesDiv.appendChild(userMessage);
    
    // Fake bot thinking delay
    const botThinking = document.createElement("div");
    botThinking.className = "message bot";
    botThinking.textContent = "Thinking...";
    messagesDiv.appendChild(botThinking);
    
    setTimeout(() => {
        botThinking.remove(); // Remove "Thinking..."

        // Fake bot response with progressive typing
        const botMessage = document.createElement("div");
        botMessage.className = "message bot";
        messagesDiv.appendChild(botMessage);
        
        let responseText = createResponse(userMessage.textContent)
        let i = 0;
        function typeText() {
            if (i < responseText.length) {
                botMessage.textContent += responseText.charAt(i);
                i++;
                setTimeout(typeText, 50); // Adjust typing speed here
            } else {
                const loadImage = document.createElement("img");
                loadImage.src = "assets/loading.gif"; // Change this to your actual image path
                loadImage.alt = "loading";
                loadImage.style.maxWidth = "10%"; // Ensures the image fits inside the chat
                messagesDiv.appendChild(loadImage);
                setTimeout(() => {
                    // Append image after text response is fully typed
                    loadImage.remove(); //remove loading image
                    const botImage = document.createElement("img");
                    botImage.src = selectPicture(); 
                    botImage.alt = "Egg";
                    botImage.style.maxWidth = "100%"; // Ensures the image fits inside the chat
                    messagesDiv.appendChild(botImage);
                }, 1000);
            }
        }
        typeText();
        
        // Scroll to bottom
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 1000); // 1 second delay
    
    // Clear input
    input.value = "";
}

//read the message and say something silly
function createResponse(userMessage){
    let responseText = "Sure thing, I'd be glad to help you. How does this look?"
    return responseText
}

//this will return a path to the asset we want
function selectPicture(userMessage) {
    let assetPath = "assets/"
    if(userMessage.includes("anime")){
        assetPath = assetPath + "egg_chan.png"
    }
    else if (userMessage.includes("hot")){
        assetPath = assetPath + "soft_boiled.png"
    }
    else if (userMessage.includes("food")){
        assetPath = assetPath + "cheggsteak.png"
    }
    else{
        assetPath = assetPath + pictureSelect + ".png"
    }
    return assetPath
}

function randomPicture(){
    let pictureSelect = Math.floor(Math.random() * 10)
    if(picturesSent.includes(pictureSelect)){
        return randomPicture()
    }
    else{
        return pictureSelect
    }

}
