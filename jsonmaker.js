const fs = require('fs')
fs.mkdirSync("metadata")
for(let i=0;i<10000;i++) {
  fs.writeFileSync(`metadata/${i+1}.json`, JSON.stringify({
    name: i+1,
    image: `bafybeidvso3nhsy6felddttsycr6vv5hpbglhlwm65p6c5wuykypsna4le/${i+1}.png`
  }, null, 2), "utf-8")
}
