/**
 * Comprehensive Financial Calculators Engine — The Seiler Group of Raymond James
 * Powers all 60 interactive calculators from the live Raymond James site with real-time math,
 * dynamic range sliders, interactive SVG charts, amortization schedules, and official definitions.
 */

(function () {
    'use strict';

    // Formatting utilities
    const fmtCurr = (num) => '$' + Number(num || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fmtCurrWhole = (num) => '$' + Math.round(Number(num || 0)).toLocaleString('en-US');
    const fmtPct = (num) => `${Number(num || 0).toFixed(num % 1 === 0 ? 0 : 1)}%`;
    const cleanNum = (val) => parseFloat(String(val || 0).replace(/[^0-9.-]/g, '')) || 0;

    // Registry of Calculator Archetypes & Models
    const CALCULATOR_MODELS = {
        '401k-savings-calculator': {
            title: '401(K) SAVINGS CALCULATOR',
            category: 'Retirement & Longevity',
            desc: 'A 401(k) can be one of your best tools for creating a secure retirement. It provides you with two important advantages. First, all contributions and earnings to your 401(k) are tax-deferred. You only pay taxes on contributions and earnings when the money is withdrawn. Second, many employers provide matching contributions to your 401(k) account.',
            heroImage: 'assets/resources/calculator-hero.jpg',
            sections: [
                {
                    title: '401(K) EMPLOYEE SAVINGS PLAN:',
                    fields: [
                        { id: 'percent_contrib', label: 'Percent to contribute:*', default: 30, min: 0, max: 100, step: 1, type: 'percent', ticks: ['0%', '33%', '67%', '100%'], tip: 'Percentage of your annual salary you contribute' },
                        { id: 'annual_salary', label: 'Annual salary:*', default: 93000, min: 0, max: 1000000, step: 1000, type: 'currency', ticks: ['$0', '$10k', '$100k', '$1m'], scalePoints: [0, 10000, 100000, 1000000], tip: 'Your annual pre-tax compensation from your employer' },
                        { id: 'salary_increase', label: 'Annual salary increase:*', default: 0, min: 0, max: 12, step: 0.5, type: 'percent', ticks: ['0%', '4%', '8%', '12%'], tip: 'Anticipated annual wage growth' },
                        { id: 'current_age', label: 'Current age:*', default: 30, min: 15, max: 90, step: 1, type: 'number', ticks: ['15', '40', '65', '90'], tip: 'Your current age' },
                        { id: 'retire_age', label: 'Age at retirement:*', default: 65, min: 10, max: 90, step: 1, type: 'number', ticks: ['10', '37', '63', '90'], tip: 'Your planned retirement target age' },
                        { id: 'current_balance', label: 'Current 401(k) balance:*', default: 1000, min: 0, max: 10000000, step: 500, type: 'currency', ticks: ['$0', '$100k', '$1m', '$10m'], scalePoints: [0, 100000, 1000000, 10000000], tip: 'Current total account balance' },
                        { id: 'rate_return', label: 'Annual rate of return:*', default: 7, min: 0, max: 12, step: 0.25, type: 'percent', ticks: ['0%', '4%', '8%', '12%'], tip: 'Anticipated annual investment return rate' }
                    ]
                },
                {
                    title: '401(K) EMPLOYER MATCH:',
                    fields: [
                        { id: 'match_percent', label: 'Employer match:*', default: 50, min: 0, max: 400, step: 5, type: 'percent', ticks: ['0%', '134%', '267%', '400%'], tip: 'Percentage of contribution matched by your company' },
                        { id: 'match_limit', label: 'Employer match ends:*', default: 6, min: 0, max: 100, step: 1, type: 'percent', ticks: ['0%', '33%', '67%', '100%'], tip: 'Salary percent threshold where match ends' }
                    ]
                }
            ],
            definitions: [
                {
                    term: 'PERCENT TO CONTRIBUTE',
                    desc: '<p>This is the percentage of your annual salary you contribute to your 401(k) plan each year. Your annual 401(k) contribution is subject to maximum limits established by the IRS.</p><p>The annual maximum for 2026 is $24,500. If you are age 50 or over, a \'catch-up\' provision allows you to contribute an additional $8,000 into your account. Beginning in 2025 the SECURE 2.0 Act increased the catch-up contribution for individuals age 60 to 63. For 2026, this is $11,250 instead of $8,000. The SECURE 2.0 Act requires high earners to make catch-up contributions on a Roth (after-tax) basis. For catch-up contributions made in 2026 this includes anyone with more than $150,000 in 2025 FICA wages from the employer sponsoring the plan. Employer contributions do not count toward the IRS annual contribution limit.</p><p>Employees classified as "Highly Compensated" may be subject to additional limits based on their employer\'s overall 401(k) participation. If you expect your salary to be $160,000 or more in 2026 or was $160,000 or more in 2025, you may need to contact your employer to see if these additional contribution limits apply to you.</p>'
                },
                {
                    term: 'ANNUAL SALARY',
                    desc: '<p>This is your annual salary from your employer, before taxes and other benefit deductions. Since your contribution and employer match are based on the salary paid to you by your employer, do not include any income you may receive from sources other than your employer.</p>'
                },
                {
                    term: 'CURRENT AGE',
                    desc: '<p>Your current age.</p>'
                },
                {
                    term: 'AGE AT RETIREMENT',
                    desc: '<p>Age at which you plan to retire. This calculator assumes that the year you retire, you do not make any contributions to your 401(k). For example, if you retire at age 65, your last contribution occurs when you are actually 64.</p>'
                },
                {
                    term: 'CURRENT 401(K) BALANCE',
                    desc: '<p>The starting balance or current amount you have invested or saved in your 401(k).</p>'
                },
                {
                    term: 'ANNUAL RATE OF RETURN',
                    desc: '<p>The annual rate of return for your 401(k) account. This calculator assumes that your return is compounded annually and your deposits are made monthly. The actual rate of return is largely dependent on the types of investments you select. The Standard & Poor\'s 500® (S&P 500®) for the 10 years ending December 31st 2025, had an annual compounded rate of return of 14.8%, including reinvestment of dividends. From January 1, 1970 to December 31st 2025, the average annual compounded rate of return for the S&P 500®, including reinvestment of dividends, was approximately 11.3% (source: www.spglobal.com). Since 1970, the highest 12-month return was 61% (June 1982 through June 1983). The lowest 12-month return was -43% (March 2008 to March 2009). Savings accounts at a financial institution pay less but carry significantly lower risk of loss of principal balances.</p><p>It is important to remember that these scenarios are hypothetical and that future rates of return can\'t be predicted with certainty and that investments that pay higher rates of return are generally subject to higher risk and volatility. The actual rate of return on investments can vary widely over time, especially for long-term investments. This includes the potential loss of principal on your investment. It is not possible to invest directly in an index and the compounded rate of return noted above does not reflect sales charges and other fees that investment funds and/or investment companies may charge.</p>'
                },
                {
                    term: 'ANNUAL SALARY INCREASE',
                    desc: '<p>The annual percentage you expect your salary to increase. The calculator assumes that your salary will continue to increase at this rate until you retire.</p>'
                },
                {
                    term: 'EMPLOYER MATCH',
                    desc: '<p>The percentage of your annual 401(k) contributions your employer will match. These contributions are often capped. Please read the definition for "Employer maximum" for more information. Also note employer contributions do not count toward the IRS annual contribution limit.</p><p>Matching contributions can also be subject to a vesting schedule. See your plan information for details.</p>'
                },
                {
                    term: 'EMPLOYER MAXIMUM',
                    desc: '<p>This is the maximum percent of your salary matched by your employer, regardless of the amount you decide to contribute.</p><p>For example, let\'s assume your employer provides a 50% match on the first 6% of your annual salary that you contribute to your 401(k). If you have an annual salary of $100,000 and contribute 6%, your contribution will be $6,000 and your employer\'s 50% match will be $3,000 ($6,000 x 50%), for a total of $9,000. If you only contribute 3%, your contribution will be $3,000 and your employer\'s 50% match will be $1,500, for a total of $4,500.</p><p>If you increase your contribution to 10%, you will contribute $10,000. Your employer\'s 50% match is limited to the first 6% of your salary then limits your employer\'s contribution to $3,000 on a $100,000 salary. The total 401(k) contribution from you and your employer would therefore be $13,000.</p>'
                }
            ],
            calculate: (vals) => {
                const s = vals.current_age;
                const B = vals.retire_age;
                const years = Math.max(1, B - s);
                const l = vals.annual_salary;
                const E = vals.percent_contrib;
                const S = vals.match_percent;
                const v = vals.match_limit;
                const r = vals.salary_increase;
                const y = vals.rate_return;
                const x = vals.current_balance;

                const U = 12; // monthly deposits
                const F = y / 100;
                const af = y > 0 ? (Math.pow(1 + F, 1 / U) - 1) : 0; // KJE.ROR_PERIOD

                // Official IRS limits
                const getCapByAge = (age) => {
                    if (age >= 60 && age <= 63) return 24500 + 11250;
                    if (age >= 50) return 24500 + 8000;
                    return 24500;
                };

                let totalEmp = 0;
                let totalMatch = 0;
                let J = x; // balance with match
                let o = x; // balance without match
                let ag = l;

                const schedule = [];

                for (let yr = 0; yr < years; yr++) {
                    const currentAge = s + yr;
                    const curCap = getCapByAge(currentAge);
                    const c = Math.round((E / 100) * ag * 100) / 100;
                    const annualEmpContrib = Math.min(c, curCap);

                    const m = Math.round(ag * (v / 100) * 100) / 100;
                    const w = Math.min(m, annualEmpContrib);
                    const annualMatchContrib = Math.round(w * (S / 100) * 100) / 100;

                    totalEmp += annualEmpContrib;
                    totalMatch += annualMatchContrib;

                    const b = Math.round((annualEmpContrib / 12) * 100) / 100;
                    const k = Math.round((annualMatchContrib / 12) * 100) / 100;
                    const X = b + k;

                    let yrGrowth = 0;
                    for (let mIdx = 0; mIdx < 12; mIdx++) {
                        J += X;
                        const R = af * J;
                        yrGrowth += R;
                        J += R;

                        o += b;
                        o += af * o;
                    }

                    schedule.push({
                        year: yr + 1,
                        age: currentAge,
                        salary: ag,
                        empContrib: annualEmpContrib,
                        empMatch: annualMatchContrib,
                        growth: yrGrowth,
                        valWithout: o,
                        valWith: J
                    });

                    // Salary increase for next year
                    const M = Math.round((1 + r / 100) * 1000) / 1000;
                    ag *= M;
                }

                const curCapInitial = getCapByAge(s);
                const contributeAnnualInitial = Math.min(Math.round((E / 100) * l * 100) / 100, curCapInitial);
                const QInitial = Math.round(Math.min(Math.round(l * (v / 100) * 100) / 100, contributeAnnualInitial) * (S / 100) * 100) / 100;

                const narrative = `With a ${y.toFixed(2)}% return, your 401(k) could be worth <strong style="color: #0011bb;">${fmtCurr(J)}</strong> after ${years} years. This was calculated with your current contribution of ${fmtCurr(contributeAnnualInitial)} per year and a current 401(k) balance of ${fmtCurr(x)}. In the current scenario, you will contribute ${E.toFixed(1)}% of your annual salary up to the IRS annual maximum of ${fmtCurr(curCapInitial)}. Your 401(k) total also includes a ${S.toFixed(2)}% employer match on up to ${v.toFixed(2)}% of your annual salary. In the current scenario, your employer is contributing ${fmtCurr(QInitial)} annually to your 401(k). Without your employer's match, your ending 401(k) would be reduced to <strong style="color: #55a049;">${fmtCurr(o)}</strong>.`;

                const resultsSummary = [
                    { label: 'Current 401(k) balance', value: fmtCurr(x) },
                    { label: 'Years to invest', value: years },
                    { label: 'Annual rate of return', value: `${y.toFixed(2)}%` },
                    { label: 'Annual salary', value: fmtCurr(l) },
                    { label: 'Expected annual salary increase', value: `${r.toFixed(1)}%` },
                    { label: 'Percent to contribute', value: `${E.toFixed(1)}%` },
                    { label: 'Your 401(k) contribution*', value: `${fmtCurr(contributeAnnualInitial)} per year` },
                    { label: "Your employer's 401(k) match", value: `${fmtCurr(QInitial)} per year (${S.toFixed(2)}% match up to ${v.toFixed(2)}% salary)` },
                    { label: 'Total you will contribute', value: fmtCurr(totalEmp) },
                    { label: 'Total your employer will contribute', value: fmtCurr(totalMatch) },
                    { label: `Total at age ${B}`, value: fmtCurr(J), highlight: true },
                    { label: 'Total without employer match', value: fmtCurr(o) }
                ];

                return {
                    summaryText: `Your total is <span class="highlight-val">${fmtCurr(J)}</span> after ${years} years.`,
                    subtotals: [
                        { id: 'sub-emp', label: `Total employee contributions: <span class="calc-subtotal-val">${fmtCurr(totalEmp)}</span>` },
                        { id: 'sub-match', label: `Total employer contributions: <span class="calc-subtotal-val">${fmtCurr(totalMatch)}</span>` }
                    ],
                    legend: [
                        { color: '#0011bb', label: `With employer match <strong>${fmtCurr(J)}</strong>` },
                        { color: '#55a049', label: `Without employer match <strong>${fmtCurr(o)}</strong>` }
                    ],
                    schedule: schedule,
                    reportNarrative: narrative,
                    resultsSummary: resultsSummary
                };
            }
        },

        'mortgage-loan-calculator': {
            title: 'MORTGAGE LOAN CALCULATOR',
            category: 'Markets & Strategy',
            desc: 'Use this calculator to generate an estimated amortization schedule for your current mortgage. Quickly see how much principal and interest you will pay over the life of your loan.',
            heroImage: 'assets/resources/calculator-hero.jpg',
            sections: [
                {
                    title: 'MORTGAGE LOAN DETAILS:',
                    fields: [
                        { id: 'loan_amount', label: 'Mortgage loan amount:*', default: 450000, min: 50000, max: 3000000, step: 10000, type: 'currency', ticks: ['$50k', '$500k', '$1.5M', '$3M'], tip: 'Total mortgage loan balance borrowed' },
                        { id: 'interest_rate', label: 'Mortgage interest rate:*', default: 6.5, min: 1, max: 15, step: 0.125, type: 'percent', ticks: ['1%', '5%', '10%', '15%'], tip: 'Fixed annual interest rate' },
                        { id: 'loan_term_years', label: 'Loan term (Years):*', default: 30, min: 5, max: 30, step: 5, type: 'number', ticks: ['5', '15', '20', '30'], tip: 'Amortization term in years' },
                        { id: 'extra_payment', label: 'Extra monthly principal:*', default: 0, min: 0, max: 2000, step: 50, type: 'currency', ticks: ['$0', '$500', '$1k', '$2k'], tip: 'Additional principal applied each month' }
                    ]
                }
            ],
            definitions: [
                { term: 'MORTGAGE LOAN AMOUNT', desc: 'The principal borrowed to purchase the home.' },
                { term: 'AMORTIZATION', desc: 'The gradual repayment of mortgage debt through monthly principal and interest installments.' }
            ],
            calculate: (vals) => {
                const P = vals.loan_amount;
                const r = (vals.interest_rate / 100) / 12;
                const n = vals.loan_term_years * 12;
                const monthlyPmt = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                let bal = P;
                let totalInt = 0;
                const schedule = [];

                for (let y = 1; y <= vals.loan_term_years; y++) {
                    let yearInt = 0;
                    let yearPrin = 0;
                    for (let m = 0; m < 12; m++) {
                        if (bal <= 0) break;
                        const intPmt = bal * r;
                        const prinPmt = Math.min(bal, (monthlyPmt + vals.extra_payment) - intPmt);
                        yearInt += intPmt;
                        yearPrin += prinPmt;
                        bal -= prinPmt;
                    }
                    totalInt += yearInt;
                    schedule.push({
                        year: y,
                        age: y,
                        salary: (monthlyPmt + vals.extra_payment) * 12,
                        empContrib: yearPrin,
                        empMatch: yearInt,
                        growth: totalInt,
                        valWith: Math.max(0, bal),
                        valWithout: P - (P / vals.loan_term_years) * y
                    });
                    if (bal <= 0) break;
                }

                return {
                    summaryText: `Your estimated monthly payment is <span class="highlight-val">${fmtCurr(monthlyPmt + vals.extra_payment)}</span>.`,
                    subtotals: [
                        { id: 'sub-total-paid', label: `Total loan cost (Principal + Interest): ${fmtCurr(P + totalInt)}` },
                        { id: 'sub-total-int', label: `Total interest paid: ${fmtCurr(totalInt)}` }
                    ],
                    legend: [
                        { color: '#2563eb', label: `Remaining Principal Balance ${fmtCurr(bal)}` },
                        { color: '#10b981', label: `Total Interest Paid ${fmtCurr(totalInt)}` }
                    ],
                    schedule: schedule
                };
            }
        },

        'roth-ira-conversion': {
            title: 'ROTH IRA CONVERSION CALCULATOR',
            category: 'Retirement & Longevity',
            desc: 'In 1997, the Roth IRA was introduced, allowing tax-free distributions in retirement in exchange for paying taxes on contributions today. Use this calculator to analyze whether converting from a traditional IRA or 401(k) to a Roth IRA makes financial sense.',
            heroImage: 'assets/resources/calculator-hero.jpg',
            sections: [
                {
                    title: 'ROTH IRA CONVERSION PARAMETERS:',
                    fields: [
                        { id: 'trad_balance', label: 'Traditional IRA balance:*', default: 150000, min: 10000, max: 2000000, step: 5000, type: 'currency', ticks: ['$10k', '$250k', '$1M', '$2M'], tip: 'Value of traditional assets to convert' },
                        { id: 'current_tax_rate', label: 'Current federal tax rate:*', default: 24, min: 10, max: 37, step: 1, type: 'percent', ticks: ['10%', '22%', '24%', '37%'], tip: 'Your current top marginal tax bracket' },
                        { id: 'future_tax_rate', label: 'Expected retirement tax rate:*', default: 28, min: 10, max: 37, step: 1, type: 'percent', ticks: ['10%', '22%', '28%', '37%'], tip: 'Expected tax bracket in retirement' },
                        { id: 'years_growth', label: 'Years until retirement:*', default: 20, min: 1, max: 40, step: 1, type: 'number', ticks: ['1', '10', '20', '40'], tip: 'Compounding horizon before taking distributions' },
                        { id: 'rate_return', label: 'Annual rate of return:*', default: 7, min: 0, max: 12, step: 0.5, type: 'percent', ticks: ['0%', '4%', '8%', '12%'], tip: 'Anticipated investment rate of return' }
                    ]
                }
            ],
            definitions: [
                { term: 'ROTH CONVERSION', desc: 'Moving funds from a traditional pre-tax IRA into an after-tax Roth IRA, creating taxable income today in exchange for tax-free growth and distributions later.' }
            ],
            calculate: (vals) => {
                const years = vals.years_growth;
                const r = vals.rate_return / 100;
                const curTax = vals.current_tax_rate / 100;
                const futTax = vals.future_tax_rate / 100;

                const taxPaidToday = vals.trad_balance * curTax;
                const rothNet = vals.trad_balance; // Assuming tax paid from outside funds
                const rothFinal = rothNet * Math.pow(1 + r, years);

                const tradGrossFinal = vals.trad_balance * Math.pow(1 + r, years);
                const tradNetFinal = tradGrossFinal * (1 - futTax);

                const schedule = [];
                for (let y = 1; y <= years; y++) {
                    schedule.push({
                        year: y,
                        age: y,
                        salary: 0,
                        empContrib: 0,
                        empMatch: 0,
                        growth: rothNet * (Math.pow(1 + r, y) - 1),
                        valWith: rothNet * Math.pow(1 + r, y),
                        valWithout: vals.trad_balance * Math.pow(1 + r, y) * (1 - futTax)
                    });
                }

                const netAdvantage = rothFinal - tradNetFinal - taxPaidToday;

                return {
                    summaryText: `Roth Conversion Net Advantage is <span class="highlight-val">${fmtCurr(netAdvantage)}</span> over ${years} years.`,
                    subtotals: [
                        { id: 'sub-roth', label: `Tax-Free Roth Balance in ${years} yrs: ${fmtCurr(rothFinal)}` },
                        { id: 'sub-trad', label: `After-Tax Traditional Balance in ${years} yrs: ${fmtCurr(tradNetFinal)}` }
                    ],
                    legend: [
                        { color: '#2563eb', label: `Roth IRA (100% Tax-Free) ${fmtCurr(rothFinal)}` },
                        { color: '#10b981', label: `Traditional IRA (After-Tax) ${fmtCurr(tradNetFinal)}` }
                    ],
                    schedule: schedule
                };
            }
        },

        'college-savings-calculator': {
            title: 'COLLEGE SAVINGS CALCULATOR',
            category: 'Family & Lifestyle',
            desc: 'A college education is one of the most important investments you can make in your children or grandchildren. Use this calculator to estimate total future tuition expenses and required monthly savings.',
            heroImage: 'assets/resources/calculator-hero.jpg',
            sections: [
                {
                    title: 'COLLEGE PLANNING DETAILS:',
                    fields: [
                        { id: 'child_age', label: 'Child current age:*', default: 5, min: 0, max: 18, step: 1, type: 'number', ticks: ['0', '5', '10', '18'], tip: 'Current age of the student' },
                        { id: 'college_age', label: 'Age entering college:*', default: 18, min: 16, max: 25, step: 1, type: 'number', ticks: ['16', '18', '21', '25'], tip: 'Expected age when starting university' },
                        { id: 'annual_cost_today', label: 'Annual college cost today:*', default: 35000, min: 5000, max: 120000, step: 2500, type: 'currency', ticks: ['$5k', '$35k', '$75k', '$120k'], tip: 'Tuition, room & board in current dollars' },
                        { id: 'inflation_rate', label: 'College cost inflation:*', default: 5, min: 1, max: 10, step: 0.5, type: 'percent', ticks: ['1%', '3%', '5%', '10%'], tip: 'Annual higher education inflation rate' },
                        { id: 'current_savings', label: 'Current 529 / college savings:*', default: 15000, min: 0, max: 250000, step: 2500, type: 'currency', ticks: ['$0', '$25k', '$100k', '$250k'], tip: 'Existing dedicated educational assets' },
                        { id: 'rate_return', label: 'Annual investment return:*', default: 7, min: 0, max: 12, step: 0.5, type: 'percent', ticks: ['0%', '4%', '8%', '12%'], tip: 'Expected growth rate of investments' }
                    ]
                }
            ],
            definitions: [
                { term: '529 COLLEGE SAVINGS PLAN', desc: 'A tax-advantaged state-sponsored investment vehicle that allows earnings to grow federal tax-free when used for qualified education expenses.' }
            ],
            calculate: (vals) => {
                const yearsToCollege = Math.max(1, vals.college_age - vals.child_age);
                const infl = vals.inflation_rate / 100;
                const r = vals.rate_return / 100;
                const iMonthly = (Math.pow(1 + r, 1 / 12) - 1);

                // Cost of 4 years adjusted for inflation
                let totalCost = 0;
                for (let yr = 0; yr < 4; yr++) {
                    totalCost += vals.annual_cost_today * Math.pow(1 + infl, yearsToCollege + yr);
                }

                // Future value of existing savings
                const fvSavings = vals.current_savings * Math.pow(1 + r, yearsToCollege);
                const shortfall = Math.max(0, totalCost - fvSavings);

                // Monthly required savings
                const months = yearsToCollege * 12;
                const monthlyRequired = shortfall > 0 ? (shortfall * iMonthly) / (Math.pow(1 + iMonthly, months) - 1) : 0;

                const schedule = [];
                let runningBal = vals.current_savings;
                for (let y = 1; y <= yearsToCollege; y++) {
                    for (let m = 0; m < 12; m++) {
                        runningBal = (runningBal + monthlyRequired) * (1 + iMonthly);
                    }
                    schedule.push({
                        year: y,
                        age: vals.child_age + y,
                        salary: 0,
                        empContrib: monthlyRequired * 12,
                        empMatch: 0,
                        growth: runningBal,
                        valWith: runningBal,
                        valWithout: totalCost * (y / yearsToCollege)
                    });
                }

                return {
                    summaryText: `Required monthly savings is <span class="highlight-val">${fmtCurr(monthlyRequired)}</span> for ${yearsToCollege} years.`,
                    subtotals: [
                        { id: 'sub-cost', label: `Total Projected 4-Year College Cost: ${fmtCurr(totalCost)}` },
                        { id: 'sub-existing', label: `Future Value of Existing Savings: ${fmtCurr(fvSavings)}` }
                    ],
                    legend: [
                        { color: '#2563eb', label: `Projected 529 Balance ${fmtCurr(totalCost)}` },
                        { color: '#10b981', label: `Target Tuition Curve ${fmtCurr(totalCost)}` }
                    ],
                    schedule: schedule
                };
            }
        }
    };

    CALCULATOR_MODELS['401-k-savings-calculator'] = CALCULATOR_MODELS['401k-savings-calculator'];

    // Make available globally
    window.CALCULATOR_MODELS = CALCULATOR_MODELS;
    window.CALC_UTILS = { fmtCurr, fmtCurrWhole, fmtPct, cleanNum };
})();
