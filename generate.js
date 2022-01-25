const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('/Users/antoine/temp/campaign.csv')
  .pipe(csv({ separator: ';', headers: false }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    
    const dataCTA = [];
    const dataNonCTA = [];
    let target;
    let potentialTarget;
    results.forEach((result) => {
      const isCTA = result[1] === '1';
      if(result['0'] === 'POTENTIAL') {
        potentialTarget = {
          total: {
            frag1: {
              tc1: parseInt(result['3']),
              tc2: parseInt(result['4']),
              tc3: parseInt(result['5']),
            },
            frag2: {
              tc1: parseInt(result['6']),
              tc2: parseInt(result['7']),
              tc3: parseInt(result['8']),
            }
          },
          initialTarget: {
            frag1: {
              tc1: parseInt(result['9']),
              tc2: parseInt(result['10']),
              tc3: parseInt(result['11']),
            },
            frag2: {
              tc1: parseInt(result['12']),
              tc2: parseInt(result['13']),
              tc3: parseInt(result['14']),
            }
          }
        };
      } else if(result['0'] === 'TARGET') {
        target = {
          total: {
            frag1: {
              tc1: parseInt(result['3']),
              tc2: parseInt(result['4']),
              tc3: parseInt(result['5']),
            },
            frag2: {
              tc1: parseInt(result['6']),
              tc2: parseInt(result['7']),
              tc3: parseInt(result['8']),
            }
          },
          initialTarget: {
            frag1: {
              tc1: parseInt(result['9']),
              tc2: parseInt(result['10']),
              tc3: parseInt(result['11']),
            },
            frag2: {
              tc1: parseInt(result['12']),
              tc2: parseInt(result['13']),
              tc3: parseInt(result['14']),
            }
          }
        };
      } else {
        const dest = (isCTA ? dataCTA : dataNonCTA);
        dest.push({
          label: result['0'],
          color: result['2'],
          value: {
            total: {
              frag1: {
                tc1: parseInt(result['3']),
                tc2: parseInt(result['4']),
                tc3: parseInt(result['5']),
              },
              frag2: {
                tc1: parseInt(result['6']),
                tc2: parseInt(result['7']),
                tc3: parseInt(result['8']),
              }
            },
            initialTarget: {
              frag1: {
                tc1: parseInt(result['9']),
                tc2: parseInt(result['10']),
                tc3: parseInt(result['11']),
              },
              frag2: {
                tc1: parseInt(result['12']),
                tc2: parseInt(result['13']),
                tc3: parseInt(result['14']),
              }
            }
          }
        })
      }
    });

    console.log(JSON.stringify({
      "target": target,
      "potentialTarget": potentialTarget,
      "activities": {
        "cta": dataCTA,
        "other": dataNonCTA
      }
    }, '', 2));

  });