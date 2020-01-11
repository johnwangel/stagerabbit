module.exports = {   apps : [
     {
       name          : 'stagerabbit',
       script        : 'npx',
       interpreter   : 'none',
       args          : 'serve -s build',
       env_production : {
         NODE_ENV: 'production'
       }
     }
   ]
}
