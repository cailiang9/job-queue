
let kue   = require('kue');
let queue = kue.createQueue();

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
  msleep(n*1000);
}

queue.process(`download`, function(job, done){
  console.log(`Working on job ${job.id}`);
  console.log(job.data);
  downloadFile(job.data.file, done);
});


function downloadFile (file, done) {
  console.log(new Date());
  sleep(5);

  console.log(`Downloading file : ${file}`);
  sleep(5);
  console.log(`Download Complete`);
  done();

}
