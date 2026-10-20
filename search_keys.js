const fs = require('fs');
const html = fs.readFileSync('dinkytown_spendless_real.html', 'utf8');

const keys = [
  'EAT_OUT_LESS',
  'FEWER_MOVIES',
  'FEWER_VACTIONS',
  'OTHER_ENTERTAINMENT',
  'CLIP_COUPONS',
  'PAYOFF_CREDIT_CARDS',
  'WAIT_FOR_NEW_CAR',
  'OTHER_BUDGET',
  'DISCONNECT_CABLE_TV',
  'ELIMINATE_CELL_PHONE',
  'REDUCE_LONG_DISTANCE',
  'OTHER_UTILITY'
];

keys.forEach(k => {
  const idx = html.indexOf(k);
  if (idx !== -1) {
    console.log(k, 'found at', idx);
    console.log(html.substring(idx - 100, idx + 150));
  } else {
    console.log(k, 'NOT found in html');
  }
});
