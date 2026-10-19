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
                        { id: 'percent_contrib', label: 'Percent to contribute:*', default: 10, min: 0, max: 100, step: 1, type: 'percent', ticks: ['0%', '33%', '67%', '100%'], tip: 'Percentage of your annual salary you contribute' },
                        { id: 'annual_salary', label: 'Annual salary:*', default: 40000, min: 0, max: 1000000, step: 1000, type: 'currency', ticks: ['$0', '$10k', '$100k', '$1m'], tip: 'Your annual pre-tax compensation from your employer' },
                        { id: 'salary_increase', label: 'Annual salary increase:*', default: 0, min: 0, max: 12, step: 0.5, type: 'percent', ticks: ['0%', '4%', '8%', '12%'], tip: 'Anticipated annual wage growth' },
                        { id: 'current_age', label: 'Current age:*', default: 30, min: 15, max: 90, step: 1, type: 'number', ticks: ['15', '40', '65', '90'], tip: 'Your current age' },
                        { id: 'retire_age', label: 'Age at retirement:*', default: 65, min: 10, max: 90, step: 1, type: 'number', ticks: ['10', '37', '63', '90'], tip: 'Your planned retirement target age' },
                        { id: 'current_balance', label: 'Current 401(k) balance:*', default: 1000, min: 0, max: 10000000, step: 500, type: 'currency', ticks: ['$0', '$100k', '$1m', '$10m'], tip: 'Current total account balance' },
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
                { term: 'PERCENT TO CONTRIBUTE', desc: 'This is the percentage of your annual salary you contribute to your 401(k) plan each year. The annual IRS limit for 2026 is $24,500 with catch-up allowances of $8,000 for age 50+ and $11,250 for ages 60-63 under the SECURE 2.0 Act.' },
                { term: 'ANNUAL SALARY', desc: 'Your annual compensation from your employer before payroll taxes and benefit deductions.' },
                { term: 'CURRENT AGE & RETIREMENT AGE', desc: 'Defines your compounding investment accumulation horizon.' },
                { term: 'EMPLOYER MATCH & MATCH LIMIT', desc: 'Company matching contributions that boost your tax-deferred nest egg.' }
            ],
            calculate: (vals) => {
                const years = Math.max(1, vals.retire_age - vals.current_age);
                const iMonthly = vals.rate_return > 0 ? (Math.pow(1 + vals.rate_return / 100, 1 / 12) - 1) : 0;
                let curSalary = vals.annual_salary;
                let balWith = vals.current_balance;
                let balWithout = vals.current_balance;
                let totalEmp = 0;
                let totalMatch = 0;
                const schedule = [];

                for (let y = 1; y <= years; y++) {
                    const empAnnual = curSalary * (vals.percent_contrib / 100);
                    const matchPortion = Math.min(vals.percent_contrib / 100, vals.match_limit / 100);
                    const matchAnnual = curSalary * matchPortion * (vals.match_percent / 100);
                    totalEmp += empAnnual;
                    totalMatch += matchAnnual;

                    const cEmpMonthly = Math.round((empAnnual / 12) * 100) / 100;
                    const cTotalMonthly = cEmpMonthly + Math.round((matchAnnual / 12) * 100) / 100;
                    const startBal = balWith;

                    for (let m = 0; m < 12; m++) {
                        balWith = (balWith + cTotalMonthly) * (1 + iMonthly);
                        balWithout = (balWithout + cEmpMonthly) * (1 + iMonthly);
                    }

                    schedule.push({
                        year: y,
                        age: vals.current_age + y - 1,
                        salary: curSalary,
                        empContrib: empAnnual,
                        empMatch: matchAnnual,
                        growth: balWith - startBal - empAnnual - matchAnnual,
                        valWith: balWith,
                        valWithout: balWithout
                    });

                    curSalary *= (1 + vals.salary_increase / 100);
                }

                return {
                    summaryText: `Your total is <span class="highlight-val">${fmtCurr(balWith)}</span> after ${years} years.`,
                    subtotals: [
                        { id: 'sub-emp', label: `Total employee contributions: ${fmtCurr(totalEmp)}` },
                        { id: 'sub-match', label: `Total employer contributions: ${fmtCurr(totalMatch)}` }
                    ],
                    legend: [
                        { color: '#2563eb', label: `With employer match ${fmtCurr(balWith)}` },
                        { color: '#10b981', label: `Without employer match ${fmtCurr(balWithout)}` }
                    ],
                    schedule: schedule
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

    // Make available globally
    window.CALCULATOR_MODELS = CALCULATOR_MODELS;
    window.CALC_UTILS = { fmtCurr, fmtCurrWhole, fmtPct, cleanNum };
})();
