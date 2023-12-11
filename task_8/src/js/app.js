let numbersArray = [];
let stopped = false;

function generateArray() {
    const input = document.getElementById('array-input').value;
    numbersArray = input.split(',').map(num => parseInt(num, 10));
    renderArray();
}

function renderArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';

    numbersArray.forEach(num => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${num * 2}px`;
        arrayContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const n = numbersArray.length;
    for (let i = 0; i < n - 1; i++) {
        if(stopped === true){
            console.log(true);
            stopped = false;
            return;
        }
        for (let j = 0; j < n - i - 1; j++) {
            if (numbersArray[j] > numbersArray[j + 1]) {
                if(stopped === true){
                    console.log(true);
                    stopped = false;
                    return;
                }
                [numbersArray[j], numbersArray[j + 1]] = [numbersArray[j + 1], numbersArray[j]];
                renderArray();
                await sleep(500);
            }
        }
    }
}

async function selectionSort() {
    const n = numbersArray.length;
    for (let i = 0; i < n - 1; i++) {
        if(stopped === true){
            stopped = false;
            return;
        }
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (numbersArray[j] < numbersArray[minIndex]) {
                minIndex = j;
            }
        }
        [numbersArray[i], numbersArray[minIndex]] = [numbersArray[minIndex], numbersArray[i]];
        renderArray();
        await sleep(500);
    }
}

async function insertionSort() {
    const n = numbersArray.length;
    for (let i = 1; i < n; i++) {
        if(stopped === true){
            stopped = false;
            return;
        }
        const key = numbersArray[i];
        let j = i - 1;
        while (j >= 0 && numbersArray[j] > key) {
            numbersArray[j + 1] = numbersArray[j];
            j = j - 1;
        }
        numbersArray[j + 1] = key;
        renderArray();
        await sleep(500);
    }
}

async function mergeSort() {
    async function merge(l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;

        const leftArray = new Array(n1);
        const rightArray = new Array(n2);

        for (let i = 0; i < n1; i++) {
            if(stopped === true){
                stopped = false;
                return;
            }
            leftArray[i] = numbersArray[l + i];
        }
        for (let j = 0; j < n2; j++) {
            if(stopped === true){
                stopped = false;
                return;
            }
            rightArray[j] = numbersArray[m + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = l;

        while (i < n1 && j < n2) {
            if(stopped === true){
                stopped = false;
                return;
            }
            if (leftArray[i] <= rightArray[j]) {
                numbersArray[k] = leftArray[i];
                i++;
            } else {
                numbersArray[k] = rightArray[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            if(stopped === true){
                stopped = false;
                return;
            }
            numbersArray[k] = leftArray[i];
            i++;
            k++;
        }

        while (j < n2) {
            if(stopped === true){
                stopped = false;
                return;
            }
            numbersArray[k] = rightArray[j];
            j++;
            k++;
        }
    }

    async function mergeSortUtil(l, r) {
        if (l < r) {
            if(stopped === true){
                stopped = false;
                return;
            }
            const m = l + Math.floor((r - l) / 2);
            await mergeSortUtil(l, m);
            await mergeSortUtil(m + 1, r);
            await merge(l, m, r);
            renderArray();
            await sleep(500);
        }
    }

    await mergeSortUtil(0, numbersArray.length - 1);
}

async function quickSort() {
    async function partition(low, high) {
        const pivot = numbersArray[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if(stopped === true){
                stopped = false;
                return;
            }
            if (numbersArray[j] < pivot) {
                i++;
                [numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]];
            }
        }

        [numbersArray[i + 1], numbersArray[high]] = [numbersArray[high], numbersArray[i + 1]];
        return i + 1;
    }

    async function quickSortUtil(low, high) {
        if (low < high) {
            const pi = await partition(low, high);
            await quickSortUtil(low, pi - 1);
            await quickSortUtil(pi + 1, high);
            renderArray();
            await sleep(500);
        }
    }

    await quickSortUtil(0, numbersArray.length - 1);
}

function startSorting() {
    generateArray();
    const selectedAlgorithm = document.getElementById('algorithm').value;
    if (selectedAlgorithm === 'bubbleSort') {
        bubbleSort();
    } else if (selectedAlgorithm === 'selectionSort') {
        selectionSort();
    } else if (selectedAlgorithm === 'insertionSort') {
        insertionSort();
    } else if (selectedAlgorithm === 'mergeSort') {
        mergeSort();
    } else if (selectedAlgorithm === 'quickSort') {
        quickSort();
    }
}

function stopSorting() {
    stopped = true;
}