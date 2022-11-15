const cols = document.querySelectorAll('.col');
    
//?Генератор рандомного цвета
// function generateRandomColors() {
//     const hexCodes = '0123456789ABCDEF';
//     let color = ''
//     for (let i = 0; i < 6; i++) {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//     }
//     return '#' + color;
// }


//!Копирование цвета
function copyToClickboard(text) {
   return navigator.clipboard.writeText(text);
}



//!Обновление страницы на нажатие пробела
document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code.toLowerCase()  === 'space')  {
         setRandomColors();
    }
 
});



//!Кнопка 
document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;
    if(type ==='lock') {
        const node =
         event.target.tagName.toLowerCase() === 'i' 
         ? event.target 
         : event.target.children[0];
         console.log(node);

         node.classList.toggle('fa-lock-open');
         node.classList.toggle('fa-lock');
    }else if (type === 'copy') {
        copyToClickboard(event.target.textContent);
    }
});



//!Присваиваем рандомный цвет колонкам и меняем название текста
function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const btn = col.querySelector('button');
//!Блокировка смены цвета 
        if(isLocked) {
            colors.push(text.textContent);
            return;
        }
        const color = isInitial 
        ? colors[index]
        ? colors[index]
        : chroma.random()
        : chroma.random();

        if(!isInitial) {
            colors.push(color); 
        }

        text.textContent = color;
        col.style.background = color;
        
        SetTextColor(text,color);
        SetTextColor(btn,color);
    });

    updateColorsHash(colors);
}



//!Определения оттенка цвета
function SetTextColor(element,color) {
    const luminance = chroma(color).luminance();
    element.style.color = luminance > 0.5 ? 'black' : 'white';
}



//!Индивидуальный хеш для каждой подборки цветов
function updateColorsHash(colors = []) {
    document.location.hash = colors
    .map((col) => {
        return col.toString().substring(1);
    })
    .join('-');
}



//!Относительный url цвета которого = hash
function getColorsFromHash() {
    if(document.location.hash.length > 1) {
       return document.location.hash
       .substring(1)
       .split('-')
       .map((color) => '#' + color );
    } 
    return [];
}




setRandomColors(true);
