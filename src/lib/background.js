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
    const circleRadius = canvas.width/3;

    let t = 0;
    // Function to generate the background
    function drawBackground() {
        // @ts-expect-error "property 'width' does not exist on type 'HTTPElement'"
        const width = canvas.width;
        // @ts-expect-error TODO
        const height = canvas.height;

        // Clear the canvas
        ctx.clearRect(0, 0, width, height);
    
        // SET TRIANGLE SIZE
        let triangleWidth
        if (width > 765) {
            triangleWidth = width/15;
        } else {
            triangleWidth = width/5;
        }
        let triangleHeight = triangleWidth * 2 / 3;


        // Move circle x
        if (circle1x < width + circleRadius) {
            circle1x += 5 + Math.sin(t)*10;
        } else {
            circle1x = -circleRadius/2;
        }

        t += .05;

        // Move circle y
        if (circle1y < height + circleRadius) {
            circle1y += 5 + Math.sin(t+5)*10;
        } else {
            circle1y = -circleRadius/2;
        }
        t += .05;

        // Function to generate RGBA color string
        /**
         * @param {number} x        Calculated red val
         * @param {number} y        Calculated red val
         * @param {number} red      Calculated red val
         * @param {number} green    Calculated green val
         * @param {number} blue     Calculated blue val
         * @param {number} alpha    Calculated alpha val
         */
        function getRGBA(x, y, red, green, blue, alpha) {
            let a = x - circle1x;
            let b = y - circle1y;
            let dist = Math.sqrt( a*a + b*b ); // distance from point to center of circle

            // Ideal gradient (logo colors)
            // rgb(49,90,176)   dark blue
            // rgb(0,208,248)   light blue
            if(dist < circleRadius){
                red   = (0-49)    * (dist / circleRadius) + 49;
                green = (208-90)  * (dist / circleRadius) + 90;
                blue  = (248-176) * (dist / circleRadius) + 176;

                // red   = (49-0)    * (dist / circleRadius) + 0;
                // green = (90-208)  * (dist / circleRadius) + 208;
                // blue  = (176-248) * (dist / circleRadius) + 248;
                alpha = Math.min(alpha, 1 - (dist / circleRadius));
            } else {
                alpha = .1;
            }

            return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        }
  
        
        // DRAW TRIANGLES Column-wise iteration
        let red, green, blue;
        for (let x = 0; x < width; x += triangleWidth/2) {
            // Decrease opacity gradient towards the center
            // const widthSquared = Math.pow(width/2, 2); - this can be taken outside the loop
            // let alpha = Math.pow(x-width/2, 2)/widthSquared;
            let alpha = .7;
        
            // Straight lines
            // background - rgb(228, 228, 231)
            red = 228;
            blue = 228;
            green = 231;
            
            for (let y = 0; y < height; y += triangleHeight) {
                ctx.strokeStyle = getRGBA(x,y, red, green, blue, alpha);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + triangleHeight); 
                ctx.stroke(); // Render the path
            }
        
            for (let y = 0; y < height; y += triangleHeight) {
                ctx.strokeStyle = getRGBA(x,y, red, green, blue, alpha);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + triangleWidth / 2, y + triangleHeight / 2);
                ctx.lineTo(x, y + triangleHeight); 
                ctx.stroke(); // Render the path
            }
        
            x += triangleWidth/2;        
            // Straight lines
            for (let y = 0; y < height; y += triangleHeight) {
                ctx.strokeStyle = getRGBA(x,y, red, green, blue, alpha);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + triangleHeight); 
                ctx.stroke(); // Render the path
            }
        
            for (let y = 0; y < height; y += triangleHeight) {
                ctx.strokeStyle = getRGBA(x,y, red, green, blue, alpha);
                ctx.beginPath();
                ctx.moveTo(x, y + triangleHeight/2);
                ctx.lineTo(x + triangleWidth / 2, y + triangleHeight);
                ctx.lineTo(x, y + triangleHeight * 3/2 ); 
                ctx.stroke(); // Render the path
            }
        }
    }
  


  
    // Draw the initial background
    drawBackground();
  
    // Redraw the background every 5 seconds
    setInterval(drawBackground, 50);
}  