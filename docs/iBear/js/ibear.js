score = 0;
cross = true;

started = false;

bear = document.querySelector('.bear');
ice = document.querySelector('.ice');
gameover = document.querySelector('.gameover');
intro = document.querySelector('.intro');
layer = document.querySelector('.layer');
button = document.getElementById('button');

bear.style.display = 'none';
ice.style.display = 'none';


audgameover = new Audio('../Assets/gameover.mp3');
audmusic = new Audio('../Assets/music.mp3');

function start()
{
    started = true;
    // console.log(started)
    bear.style.display = 'block';
    ice.style.display = 'block';
    button.style.display = 'none';
}

setInterval(() => {
    
    if (started) {

        // Music :
        setTimeout(() => {
            // audmusic.muted = true;
            audmusic.play();
        },1000)
        
        // Player movement : 
        window.onkeydown = function(f){
        
            //console.log("key code is: ");
            
            bearx = parseInt(window.getComputedStyle(bear, null).getPropertyValue('left'));
            if(f.keyCode==38||f.keyCode==87){
                bear.classList.add('animatebear');
                setTimeout(()  =>  {
                    bear.classList.remove('animatebear');
                }, 700);
            }
            if((f.keyCode==39||f.keyCode==68)&& bearx<1500){
                bear.style.left = bearx + 112 + "px";
            }
            if((f.keyCode==37||f.keyCode==65)&& bearx>-60){
                bear.style.left = (bearx - 112) + "px";
            }
        }
    
        // Game manager :
            bx = parseInt(window.getComputedStyle(bear, null).getPropertyValue('left'));
            by = parseInt(window.getComputedStyle(bear, null).getPropertyValue('top'));
        
            ix = parseInt(window.getComputedStyle(ice, null).getPropertyValue('left'));
            iy = parseInt(window.getComputedStyle(ice, null).getPropertyValue('top'));
        
            offsetX = Math.abs(bx-ix);
            offsetY = Math.abs(by-iy);
            // console.log(ix);
            // console.log(offsetX , offsetY)
        
            if (offsetX<83 && offsetY<52){
                gameover.style.visibility = 'visible';
                intro.style.visibility = 'hidden';
                bear.style.display = 'none';
                ice.classList.remove('animateice');
                layer.classList.remove('layerani');
                window.onkeydown = function(f){
                    if(f.keyCode==38){
                        ice = document.querySelector('.ice');
                        ice.classList.add('iceani');
                        setTimeout(() => {
                            ice.classList.remove('iceani');
                        }, 500);
                    }
                    if(f.keyCode==39){
                        ice = document.querySelector('.ice');
                        icex = parseInt(window.getComputedStyle(ice, null).getPropertyValue('left'));
                        ice.style.left = icex + 112 + "px";
                    }
                    if(f.keyCode==37){
                        ice = document.querySelector('.ice');
                        icex = parseInt(window.getComputedStyle(ice, null).getPropertyValue('left'));
                        ice.style.left = (icex - 112) + "px";
                    }
                }
        
                audmusic.pause();
                audgameover.play();
                setTimeout(() => {
                    audgameover.pause();
                }, 1000);

                started = false;
            }
        
            else if (ix<-10) {
                aniDur = parseFloat(window.getComputedStyle(ice, null).getPropertyValue('animation-duration'));
                newDur = aniDur-0.05;
                ice.style.animationDuration = newDur + 's';
                // console.log("new animation duration :",newDur)
                score += 1;
                updateScore(score);
                cross = false;
                setTimeout(() => {
                  cross = true;
                }, 1000);
            }
    }

}, 100);

function updateScore(score) {
    scorecontainer.innerHTML = "Your Score is: " + score
}