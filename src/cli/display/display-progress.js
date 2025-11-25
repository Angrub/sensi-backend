import colors from "./colors.js";

export function displayProgress({title, description, progress, total, timeout}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const percentage = progress / total;
        
            let progressBar = "[";
            const progressCount = Math.round(percentage * 78);
            
            for (let i = 0; i < progressCount; i++) {
                progressBar += "=";
            }
        
            const displayPercentaje = (percentage * 100).toFixed()
            const barColor = displayPercentaje === '100' ? colors.green : colors.cyan;

            console.clear();
            console.log(`\n${colors.bgBlue}${colors.bright} Action: ${colors.reset} ${title}${colors.reset}\n`);
            console.log(`>   ${description}`)
            console.log(`\x1b[76C${displayPercentaje}%`);
            console.log(`${barColor}${progressBar}>\x1b[80C]${colors.reset}`);
            resolve()
        }, timeout || 500);
    })
}

