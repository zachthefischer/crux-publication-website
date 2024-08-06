// src/lib/background.js
import { error } from "@sveltejs/kit";

// Get the canvas element and its context
// @ts-expect-error "canvasId is any type"
export function setupBackground(canvasId) {
    // var body = document.body,
        // html = document.documentElement;
    // var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    const canvas = document.getElementById(canvasId);  
    // @ts-expect-error "getContext does not exist on type HTTP"
    const ctx = canvas.getContext('2d');
  
    // Set the canvas size to match the window size
    function resizeCanvas() {
        // @ts-expect-error TODO
        canvas.width = window.innerWidth;
        // @ts-expect-error TODO
        canvas.height = window.innerHeight;
    }
  
    // Initial resize to set canvas size
    resizeCanvas();
  
    // Re-adjust canvas size when the window is resized
    window.addEventListener('resize', resizeCanvas);
    
    let circle1x = Math.random() * canvas.width;
    let circle1y = Math.random() * canvas.height;
    const circleRadius = 750;

    let t = 0;
    // Function to generate the background
    function drawBackground() {
        // @ts-expect-error "property 'width' does not exist on type 'HTTPElement'"
        const width = canvas.width;
        // @ts-expect-error TODO
        const height = canvas.height;

        // Clear the canvas
        ctx.clearRect(0, 0, width, height);
    
        let heightInc = height/15;
        let widthInc = width/15;

        let red = 255;
        let blue = 10;
        let green = 10;

        // Move circle
        if (circle1x < width + circleRadius) {
            circle1x += 5 + Math.sin(t)*10;
        } else {
            circle1x = -circleRadius/2;
        }

        t += .01;

        // Move circle
        if (circle1y < height + circleRadius) {
            circle1y += 5 + Math.sin(t+5)*10;
        } else {
            circle1y = -circleRadius/2;
        }

        t += .01;

        // Function to generate RGBA color string
        /**
         * @param {number} x
         * @param {number} y
         * @param {number} red
         * @param {number} green
         * @param {number} blue
         * @param {number} alpha
         */
        function getRGBA(x, y, red, green, blue, alpha) {
            let a = x - circle1x;
            let b = y - circle1y;
            let dist = Math.sqrt( a*a + b*b );

            if(dist < circleRadius){
                red = 111 * circleRadius / dist;
                blue = Math.max(blue, 255 * circleRadius / dist);
                green = 0;
                alpha = Math.min(alpha, 1 - (dist / circleRadius));
            }

            return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        }
  

        
        const widthSquared = Math.pow(width/2, 2);
        // Column-wise iteration
        for (let x = 0; x < width; x += widthInc/2) {
            let alpha = Math.pow(x-width/2, 2)/widthSquared;
            // let alpha = 1;
            // console.log(alpha);
        
            // Straight lines
            red = 255;
            blue = 255;
            green = 255;
            for (let y = 0; y < height; y += heightInc) {
                ctx.strokeStyle = getRGBA(x,y, red, green, blue, alpha);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + heightInc); 
                ctx.stroke(); // Render the path
            }
        
            for (let y = 0; y < height; y += heightInc) {
                ctx.strokeStyle = getRGBA(x,y, red, green, blue, alpha);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + widthInc / 2, y + heightInc / 2);
                ctx.lineTo(x, y + heightInc); 
                ctx.stroke(); // Render the path
            }
        
            x += widthInc/2;        
            // Straight lines
            for (let y = 0; y < height; y += heightInc) {
                ctx.strokeStyle = getRGBA(x,y, red, green, blue, alpha);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + heightInc); 
                ctx.stroke(); // Render the path
            }
        
            for (let y = 0; y < height; y += heightInc) {
                ctx.strokeStyle = getRGBA(x,y, red, green, blue, alpha);
                ctx.beginPath();
                ctx.moveTo(x, y + heightInc/2);
                ctx.lineTo(x + widthInc / 2, y + heightInc);
                ctx.lineTo(x, y + heightInc * 3/2 ); 
                ctx.stroke(); // Render the path
            }
        }
    }
  


  
    // Draw the initial background
    drawBackground();
  
    // Redraw the background every 5 seconds
    setInterval(drawBackground, 50);
}  