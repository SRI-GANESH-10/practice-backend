import fs from 'fs'
// await fs.promises.mkdir('uploads')
// await fs.promises.writeFile('abc.txt' , "This is an apple" , "utf-8")
// let read = await fs.promises.readFile('abc.txt' )
// console.log(read)

let readStream = fs.createReadStream('abc.txt', {
    encoding:'utf-8',
    highWaterMark:512
});

readStream.on("data" , (chunk)=>{
    console.log(chunk.length , "bytes")
})

readStream.on("end" , ()=>{
    console.log("Done with reading stream")
})

let writeStream = fs.createWriteStream('abc1.txt')
readStream.pipe(writeStream);

writeStream.on("finish" , ()=>{
    console.log("Done wriing")
})