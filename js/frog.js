document.addEventListener('DOMContentLoaded', () => {
    const jumpSound = document.getElementById('jump-sound');
    const modal = document.getElementById('game-over-modal');
    const closeModal = document.querySelector('.close');

    document.addEventListener('keyup', function (e) {
        let currentFrog = document.querySelector('.frog-img');
        let currentParent = currentFrog.parentElement;

        let nextParent;

        if(currentParent.classList.contains('circle')){
            currentParent.classList.remove('shake');
            
        }
        
        const targetCircles = ['circle-2', 'circle-6', 'circle-8', 'circle-16'];
        if (targetCircles.includes(currentParent.id)) {
            const lily  = currentParent.querySelector('.lily-img');
            const crocodile = currentParent.querySelector('.crocodile-img');

            lily.style.display = 'none';
            currentFrog.style.display = 'none';
            crocodile.style.display = 'block';

            setTimeout(()=> {
                modal.style.display = 'block';
            }, 100);


            return;
        }

        if (currentParent.classList.contains('bottom-left')) {
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowUp':
                    nextParent = document.getElementById('circle-13');
                    nextParent.appendChild(currentFrog);
                    break;
                default: return;
            }
        } else if (currentParent.classList.contains('circle')) {
            let parentSquare = currentParent.parentElement;
            let currentIndex = parseInt(parentSquare.id.split('-')[1]);
            let nextIndex;

            switch (e.key) {
                case 'ArrowUp':
                    nextIndex = currentIndex - 4;
                    break;
                case 'ArrowDown':
                    nextIndex = currentIndex + 4;
                    break;
                case 'ArrowLeft':
                    if (currentIndex % 4 !== 1) {
                        nextIndex= currentIndex - 1;
                    }
                    break;
                case 'ArrowRight':
                    if (currentIndex % 4 !== 0) {
                        nextIndex= currentIndex + 1;
                    }
                    break;
                default: return;
            }
            if (nextIndex >= 1 && nextIndex <= 16 ) {
                nextParent = document.getElementById('circle-' + nextIndex);
                if (nextParent) {
                    nextParent.appendChild(currentFrog);
                }
            }
        }
        if(currentParent.id === 'circle-4' && (e.key === 'ArrowRight' || e.key === 'ArrowUp')){
            let topRight = document.querySelector('.landscape.top-right');
            topRight.appendChild(currentFrog);
        }


        if (currentParent.id === 'circle-13' && (e.key === 'ArrowDown' || e.key === 'ArrowLeft')) {
            let bottomLeft = document.querySelector('.landscape.bottom-left');
            bottomLeft.appendChild(currentFrog);
        }
        

        else if (currentParent.classList.contains('top-right')){
            if(e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                nextParent = document.getElementById('circle-4');
                nextParent.appendChild(currentFrog);
            }
        }

        if (nextParent && nextParent.classList.contains('circle')) {
            nextParent.classList.add('shake');
        }

        if(jumpSound){
            jumpSound.currentTime = 0;
            jumpSound.play();
        }

    });
     
    closeModal.addEventListener('click', function(){
      modal.style.display = 'none';
      
        const bottomLeft = document.querySelector('.bottom-left');
        const currentFrog = document.querySelector('.frog-img');
        const allLily = document.querySelectorAll('.lily-img');
        const allCrocodiles = document.querySelectorAll('.crocodile-img');


      bottomLeft.appendChild(currentFrog);
      currentFrog.style.display = 'block';

        allLily.forEach(lily => lily.style.display = 'block');
        allCrocodiles.forEach(croc => croc.style.display = 'none');
    });

    window.onclick = function(e) {
        if(e.target === modal) {
            modal.style.display = 'none';
        }
    };

})