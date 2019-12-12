let kue   = require(`kue`);
let queue = kue.createQueue();

var i;
//event handler. Called when job is saved to the Redis.
queue.on(`job enqueue`, function(){
    console.log(`Job Submitted in the Queue.`);
    if (i==4)
        process.exit(0);
});

for (i = 0; i < 4; i++) {
    let job = queue.create(`download`, {
        file : `Sample/path/to/file${new Date()}`
    })
    .attempts(3) // if job fails retry 3 times
    .backoff({delay: 60 * 1000}) // wait 60s before retry
    .save();

    console.log(new Date());
}
