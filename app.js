const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const addTextBoxBtn = document.getElementById('addTextBoxBtn');
const additionalTextBoxes = document.getElementById('additionalTextBoxes');

let img = new Image();
let textBoxes = [];

imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        img.src = e.target.result;
    }
    
    reader.readAsDataURL(file);
});

img.onload = function() {
    // Set canvas dimensions
    const maxWidth = 800; // maximum width of the canvas
    const maxHeight = 600; // maximum height of the canvas

    // Calculate the scaling ratio
    let ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
    
    // Set canvas dimensions
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;

    // Draw the resized image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

generateBtn.addEventListener('click', function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = '30px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    const topText = topTextInput.value;
    const bottomText = bottomTextInput.value;

    ctx.textAlign = 'center';
    ctx.fillText(topText, canvas.width / 2, 40);
    ctx.strokeText(topText, canvas.width / 2, 40);
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);

    textBoxes.forEach(box => {
        ctx.font = '20px Arial';
        ctx.fillText(box.text, box.x, box.y);
        ctx.strokeText(box.text, box.x, box.y);
    });
});

downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

addTextBoxBtn.addEventListener('click', function() {
    const newTextBox = document.createElement('input');
    newTextBox.type = 'text';
    newTextBox.className = 'additionalTextBox';
    newTextBox.placeholder = 'Additional Text';
    newTextBox.addEventListener('input', function() {
        const text = this.value;
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        textBoxes.push({ text, x, y });
    });
    additionalTextBoxes.appendChild(newTextBox);
});