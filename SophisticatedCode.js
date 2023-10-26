/* 
Filename: SophisticatedCode.js
Description: This code demonstrates a multithreaded sorting algorithm called merge sort with added functionality for handling large datasets and generating statistical reports.
Author: John Doe
Date: 2022-10-01
*/

// Random number generator
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Merge sort algorithm
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Generate a large dataset (100,000 random numbers)
const dataset = [];
for (let i = 0; i < 100000; i++) {
  dataset.push(getRandomInt(1, 1000000));
}

// Sort the dataset using merge sort (multithreaded)
const numThreads = 4;
const chunkSize = Math.ceil(dataset.length / numThreads);

const threads = [];
for (let i = 0; i < numThreads; i++) {
  const start = i * chunkSize;
  const end = start + chunkSize;
  const chunk = dataset.slice(start, end);

  threads.push(new Worker("./mergeSortWorker.js"));
  threads[i].postMessage(chunk);
}

const sortedChunks = [];

for (let i = 0; i < numThreads; i++) {
  threads[i].onmessage = function (event) {
    sortedChunks[i] = event.data;

    if (sortedChunks.filter(Boolean).length === numThreads) {
      // All threads finished sorting their chunks

      // Merge sorted chunks
      let sortedDataset = sortedChunks.reduce((acc, chunk) => merge(acc, chunk), []);

      // Generate statistical reports
      const min = sortedDataset[0];
      const max = sortedDataset[sortedDataset.length - 1];
      const median =
        sortedDataset.length % 2 === 0
          ? (sortedDataset[sortedDataset.length / 2] + sortedDataset[sortedDataset.length / 2 - 1]) / 2
          : sortedDataset[Math.floor(sortedDataset.length / 2)];
      const sum = sortedDataset.reduce((acc, val) => acc + val, 0);
      const mean = sum / sortedDataset.length;

      console.log("Sorted Dataset:", sortedDataset.slice(0, 10), "...");
      console.log("Statistics:");
      console.log("Min:", min);
      console.log("Max:", max);
      console.log("Median:", median);
      console.log("Sum:", sum);
      console.log("Mean:", mean);
    }
  };
}
