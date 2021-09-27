import {ACTIONS} from './actions.js';

const stack = [];
let output = document.querySelector('.output-cont-textarea');
let textArea = document.createElement('textarea');
let selected = document.querySelector('.selected-icons');
let controls = document.querySelector('.controls-cont');

function pushOnStack(action,stack){
    stack.push(action);
    setSelectedList();
}

function popOffStack(stack){
    stack.pop();
    setSelectedList();
}

function clearStack(stack){
    length = stack.length
    for(let i = 0; i < length; i++){
        stack.pop();
    }
    textArea.innerHTML =``;
    setSelectedList();
}

function generateMacro(actions){
    let string =``;
    let line = 0
    let macroNum = 1;
    for (let action of actions){
        if(macroNum > 1 && line%15 === 0){string += '\n'}
        if(line%15 === 0){string = string + `Macro #${macroNum}\n\n`;macroNum++}
        string = string + `/ac "${action.name}" <wait.${action.wait}>\n`
        line++;
    }
    return string;
}

function setSelectedList(){
    selected.childNodes.forEach((n) =>{n.remove()});
    let cont = document.createElement('div');
    for(let action of stack){
        let temp = document.createElement('img')
        temp.setAttribute('src',`./assets/images/icons/${action.icon}`);
        temp.setAttribute('alt',`${action.name}`);
        temp.setAttribute('class',`action-icon`);
        temp.addEventListener('click',()=>{
            popOffStack(action,stack)
        })
        cont.appendChild(temp);
    }
    selected.appendChild(cont);
}

function totalCP(actions){
    let cpTotal = 0;
    for(let action of actions){
        cpTotal += action.cp;
    }
    return cpTotal
}

function actionList(actions){
    let div = document.createElement('div');
    for(let action of actions){
        let temp = document.createElement('img');
        temp.setAttribute('src',`./assets/images/icons/${action.icon}`);
        temp.setAttribute('class',`action-icon`);
        temp.addEventListener('click',()=>{
            pushOnStack(action,stack)
        })
        temp.addEventListener('mouseover',() => {
            document.querySelector('.name-display').innerHTML = action.name;
        });
        temp.addEventListener('mouseout',() => {
            document.querySelector('.name-display').innerHTML = '';
        });
        div.appendChild(temp);
    }
    document.querySelector('.action-cont-actions').appendChild(div);
}

function attachControls(ctrls = document.createElement('div')){
    let generate = document.createElement('input');
    let _delete = document.createElement('input');
    let clear = document.createElement('input');

    generate.setAttribute('value', 'Generate')
    generate.setAttribute('type', 'button')
    generate.addEventListener('click',() => {
        textArea.innerHTML =`${generateMacro(stack)}`;
    })
    _delete.setAttribute('value', 'Delete')
    _delete.setAttribute('type', 'button')
    _delete.addEventListener('click',() => {
        popOffStack(stack);
    })
    clear.setAttribute('value', 'Clear')
    clear.setAttribute('type', 'button')
    clear.addEventListener('click',() => {
        clearStack(stack)
    })
    ctrls.appendChild(generate);
    ctrls.appendChild(_delete);
    ctrls.appendChild(clear);
}

attachControls(controls);
textArea.setAttribute('class','output');
output.appendChild(textArea);
actionList(ACTIONS);
