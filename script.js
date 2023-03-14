const graphHolder = document.querySelector('.expenditure-graph')


// CODE SNIPPET FOR FUTURE (IMPLEMENTING DARK MODE)
// const circle = document.querySelector('.circle')
// const toggleBtn = document.querySelector('.toggle-btn')
// console.log(circle)
// // console.log(graphHolder)

// circle.addEventListener('click', handleClick)

// function handleClick() {
//     let isLeft = this.getAttribute('data-left')

//     if(isLeft === 'true'){
//         this.style.transform = `translateX(20px)`;
//         this.style.backgroundColor = 'black'
//         toggleBtn.style.backgroundColor = 'white'

//         this.setAttribute('data-left', 'false');
//     } else {
//         this.style.transform = `translateX(0px)`;
//         this.style.backgroundColor = 'white'
//         toggleBtn.style.backgroundColor = 'black'

//         this.setAttribute('data-left', 'true');
//     }
// }

fetch('./data.json')
.then(res => res.json())
.then(data => {

    const allValues = data.map(item => item.amount)
    allValues.sort()
    const maxValue = allValues[allValues.length - 1]

    graphHolder.innerHTML = `
        ${data.map(item =>{ 
            // CHECKING IF MAX VALUE MATCHES CURRENT DATA VALUE
            let isHighest = false;
            item.amount === maxValue && ( isHighest = true ) 
   
            return `${renderBarGraph(item.amount, item.day, isHighest)}`
        }).join('')
        }
    `
})

function renderBarGraph(amount, day, isHighest){
    const percentage = (Number(amount) / 80) * 100;
    return (
        `
        <div class='bar-container'>
            <div class='bar' style='height:${percentage}%;' data-tallest=${isHighest ? 'true' : 'false'}>
                <span class='tooltip'>$${amount}</span>
            </div>
        
            <p class='day-of-week'>${day}</p>
        </div>
        `
    )
}


