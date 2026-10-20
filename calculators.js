/**
 * Interactive Financial Calculators Engine — The Seiler Group of Raymond James
 * Provides dynamic dual-slider controls, real-time mathematical calculations,
 * and seamless in-site modal integration.
 */

(function () {
    'use strict';

    // Formatting utilities
    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    const formatPercent = (val) => `${Number(val).toFixed(val % 1 === 0 ? 0 : 1)}%`;
    const parseNumber = (val) => {
        if (typeof val === 'number') return val;
        const cleaned = String(val).replace(/[^0-9.-]/g, '');
        return parseFloat(cleaned) || 0;
    };

    // State of the active calculator
    let activeType = 'retirement';
    let activeCardTitle = '';
    let activeCategory = '';

    // Model Definitions & Configs
    const MODELS = {
        retirement: {
            title: '401(K) EMPLOYEE SAVINGS PLAN:',
            fields: [
                { id: 'percent_contrib', label: 'Percent to contribute:*', default: 10, min: 0, max: 100, step: 1, type: 'percent', ticks: ['0%', '33%', '67%', '100%'] },
                { id: 'annual_salary', label: 'Annual salary:*', default: 40000, min: 0, max: 500000, step: 5000, type: 'currency', ticks: ['$0', '$10k', '$100k', '$500k'] },
                { id: 'salary_increase', label: 'Annual salary increase:*', default: 2, min: 0, max: 12, step: 0.5, type: 'percent', ticks: ['0%', '4%', '8%', '12%'] },
                { id: 'current_age', label: 'Current age:*', default: 30, min: 15, max: 80, step: 1, type: 'number', ticks: ['15', '40', '65', '80'] },
                { id: 'retirement_age', label: 'Age at retirement:*', default: 65, min: 50, max: 90, step: 1, type: 'number', ticks: ['50', '65', '75', '90'] },
                { id: 'current_balance', label: 'Current 401(k) balance:*', default: 10000, min: 0, max: 1000000, step: 5000, type: 'currency', ticks: ['$0', '$100k', '$500k', '$1M'] },
                { id: 'rate_of_return', label: 'Annual rate of return:*', default: 7, min: 0, max: 12, step: 0.5, type: 'percent', ticks: ['0%', '4%', '8%', '12%'] }
            ],
            matchSection: {
                title: '401(K) EMPLOYER MATCH:',
                fields: [
                    { id: 'match_percent', label: 'Employer match percent:*', default: 50, min: 0, max: 100, step: 5, type: 'percent', ticks: ['0%', '25%', '50%', '100%'] },
                    { id: 'match_limit', label: 'Match limit on salary:*', default: 6, min: 0, max: 15, step: 1, type: 'percent', ticks: ['0%', '3%', '6%', '15%'] }
                ]
            },
            calculate: (vals) => {
                const years = Math.max(0, vals.retirement_age - vals.current_age);
                let currentSalary = vals.annual_salary;
                let balance = vals.current_balance;
                let totalEmployeeContrib = 0;
                let totalEmployerMatch = 0;
                const r = vals.rate_of_return / 100;
                const g = vals.salary_increase / 100;
                const contribRate = vals.percent_contrib / 100;
                const matchRate = (vals.match_percent || 0) / 100;
                const matchLimit = (vals.match_limit || 0) / 100;

                for (let i = 0; i < years; i++) {
                    const empContrib = currentSalary * contribRate;
                    const matchedSalaryPercent = Math.min(contribRate, matchLimit);
                    const empMatch = currentSalary * matchedSalaryPercent * matchRate;

                    totalEmployeeContrib += empContrib;
                    totalEmployerMatch += empMatch;

                    balance = (balance + empContrib + empMatch) * (1 + r);
                    currentSalary *= (1 + g);
                }

                const annualWithdrawal = balance * 0.04;

                return {
                    highlight: `Total employee contributions: ${formatCurrency(totalEmployeeContrib)}`,
                    metrics: [
                        { label: 'Projected 401(k) Nest Egg', value: formatCurrency(balance), accent: true },
                        { label: 'Total Employer Match', value: formatCurrency(totalEmployerMatch) },
                        { label: 'Est. Annual Retirement Income', value: `${formatCurrency(annualWithdrawal)}/yr` }
                    ]
                };
            }
        },

        loan: {
            title: 'LOAN & MORTGAGE AMORTIZATION DETAILS:',
            fields: [
                { id: 'loan_amount', label: 'Loan / Mortgage amount:*', default: 350000, min: 10000, max: 1500000, step: 5000, type: 'currency', ticks: ['$10k', '$250k', '$750k', '$1.5M'] },
                { id: 'interest_rate', label: 'Annual interest rate:*', default: 6.5, min: 1, max: 15, step: 0.125, type: 'percent', ticks: ['1%', '5%', '10%', '15%'] },
                { id: 'loan_term_years', label: 'Loan term (Years):*', default: 30, min: 5, max: 30, step: 5, type: 'number', ticks: ['5', '15', '20', '30'] },
                { id: 'extra_payment', label: 'Extra monthly principal:*', default: 100, min: 0, max: 1000, step: 25, type: 'currency', ticks: ['$0', '$250', '$500', '$1,000'] }
            ],
            calculate: (vals) => {
                const P = vals.loan_amount;
                const monthlyRate = (vals.interest_rate / 100) / 12;
                const n = vals.loan_term_years * 12;
                
                let baseMonthly = 0;
                if (monthlyRate > 0) {
                    baseMonthly = P * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
                } else {
                    baseMonthly = P / n;
                }

                // Amortization with extra payment
                let balance = P;
                let totalPaid = 0;
                let totalInterest = 0;
                let months = 0;
                const monthlyPayment = baseMonthly + vals.extra_payment;

                while (balance > 0 && months < n) {
                    const interest = balance * monthlyRate;
                    const principal = Math.min(balance, monthlyPayment - interest);
                    balance -= principal;
                    totalInterest += interest;
                    totalPaid += (principal + interest);
                    months++;
                }

                const yearsSaved = Math.max(0, ((n - months) / 12)).toFixed(1);

                return {
                    highlight: `Monthly Payment (P&I): ${formatCurrency(baseMonthly)}`,
                    metrics: [
                        { label: 'Total Loan Cost', value: formatCurrency(totalPaid), accent: true },
                        { label: 'Total Interest Paid', value: formatCurrency(totalInterest) },
                        { label: 'Payoff Acceleration', value: `${yearsSaved} Years Saved` }
                    ]
                };
            }
        },

        compound: {
            title: 'SAVINGS & COMPOUND GROWTH PLAN:',
            fields: [
                { id: 'initial_deposit', label: 'Initial deposit amount:*', default: 15000, min: 0, max: 250000, step: 1000, type: 'currency', ticks: ['$0', '$50k', '$150k', '$250k'] },
                { id: 'monthly_savings', label: 'Monthly contribution:*', default: 600, min: 0, max: 10000, step: 50, type: 'currency', ticks: ['$0', '$2.5k', '$5k', '$10k'] },
                { id: 'years_to_grow', label: 'Investment time horizon (Years):*', default: 20, min: 1, max: 40, step: 1, type: 'number', ticks: ['1', '10', '25', '40'] },
                { id: 'annual_roi', label: 'Estimated annual return rate:*', default: 8, min: 1, max: 15, step: 0.5, type: 'percent', ticks: ['1%', '5%', '10%', '15%'] }
            ],
            calculate: (vals) => {
                const r = (vals.annual_roi / 100) / 12;
                const months = vals.years_to_grow * 12;
                let balance = vals.initial_deposit;
                let totalContributions = vals.initial_deposit;

                for (let m = 0; m < months; m++) {
                    balance = (balance + vals.monthly_savings) * (1 + r);
                    totalContributions += vals.monthly_savings;
                }

                const totalInterest = Math.max(0, balance - totalContributions);

                return {
                    highlight: `Total Future Value: ${formatCurrency(balance)}`,
                    metrics: [
                        { label: 'Total Future Wealth', value: formatCurrency(balance), accent: true },
                        { label: 'Total Principal Invested', value: formatCurrency(totalContributions) },
                        { label: 'Compound Interest Earned', value: formatCurrency(totalInterest) }
                    ]
                };
            }
        },

        networth: {
            title: 'ASSETS & LIABILITIES BALANCE SHEET:',
            fields: [
                { id: 'liquid_assets', label: 'Cash & liquid savings:*', default: 35000, min: 0, max: 500000, step: 5000, type: 'currency', ticks: ['$0', '$100k', '$250k', '$500k'] },
                { id: 'investments', label: 'Retirement & Brokerage accounts:*', default: 320000, min: 0, max: 2000000, step: 10000, type: 'currency', ticks: ['$0', '$500k', '$1M', '$2M'] },
                { id: 'real_estate', label: 'Primary home & real estate:*', default: 650000, min: 0, max: 3000000, step: 25000, type: 'currency', ticks: ['$0', '$1M', '$2M', '$3M'] },
                { id: 'mortgage_debt', label: 'Outstanding mortgage balance:*', default: 340000, min: 0, max: 2000000, step: 10000, type: 'currency', ticks: ['$0', '$500k', '$1M', '$2M'] },
                { id: 'other_debts', label: 'Credit cards, auto & other loans:*', default: 22000, min: 0, max: 250000, step: 2500, type: 'currency', ticks: ['$0', '$50k', '$150k', '$250k'] }
            ],
            calculate: (vals) => {
                const totalAssets = vals.liquid_assets + vals.investments + vals.real_estate;
                const totalDebts = vals.mortgage_debt + vals.other_debts;
                const netWorth = totalAssets - totalDebts;

                return {
                    highlight: `Total Personal Net Worth: ${formatCurrency(netWorth)}`,
                    metrics: [
                        { label: 'Estimated Net Worth', value: formatCurrency(netWorth), accent: true },
                        { label: 'Total Gross Assets', value: formatCurrency(totalAssets) },
                        { label: 'Total Liabilities', value: formatCurrency(totalDebts) }
                    ]
                };
            }
        },

        tax: {
            title: 'TAX PLANNING & RMD CALCULATOR:',
            fields: [
                { id: 'tax_account_balance', label: 'Traditional IRA / 401(k) balance:*', default: 650000, min: 10000, max: 5000000, step: 25000, type: 'currency', ticks: ['$10k', '$1M', '$2.5M', '$5M'] },
                { id: 'owner_age', label: 'Account owner age:*', default: 73, min: 73, max: 95, step: 1, type: 'number', ticks: ['73', '80', '88', '95'] },
                { id: 'tax_rate', label: 'Effective marginal tax bracket:*', default: 24, min: 10, max: 37, step: 1, type: 'percent', ticks: ['10%', '22%', '24%', '37%'] }
            ],
            calculate: (vals) => {
                // IRS Uniform Lifetime Distribution Factor approximation (Table III)
                const age = vals.owner_age;
                const factor = Math.max(5.3, 27.4 - (age - 72) * 0.9);
                const rmd = vals.tax_account_balance / factor;
                const taxOwed = rmd * (vals.tax_rate / 100);
                const netRmd = rmd - taxOwed;

                return {
                    highlight: `Annual Required Minimum Distribution (RMD): ${formatCurrency(rmd)}`,
                    metrics: [
                        { label: 'Gross RMD Amount', value: formatCurrency(rmd), accent: true },
                        { label: 'Est. Federal Tax Owed', value: formatCurrency(taxOwed) },
                        { label: 'Net After-Tax Income', value: formatCurrency(netRmd) }
                    ]
                };
            }
        }
    };

    // Determine model from card title
    function determineModel(title) {
        const t = (title || '').toUpperCase();
        if (t.includes('LOAN') || t.includes('MORTGAGE') || t.includes('HELOC') || t.includes('REFINANCE') || t.includes('PAYOFF') || t.includes('DEBT') || t.includes('AMORTIZ')) {
            return 'loan';
        }
        if (t.includes('SAVINGS') || t.includes('COMPOUND') || t.includes('COLLEGE') || t.includes('EMERGENCY') || t.includes('INVESTMENT') || t.includes('CERTIFICATE OF DEPOSIT')) {
            if (t.includes('401') || t.includes('403') || t.includes('RETIRE') || t.includes('ROTH') || t.includes('IRA') || t.includes('SOCIAL SECURITY')) {
                return 'retirement';
            }
            return 'compound';
        }
        if (t.includes('NET WORTH') || t.includes('BUDGET') || t.includes('CASH FLOW') || t.includes('SPOUSE')) {
            return 'networth';
        }
        if (t.includes('TAX') || t.includes('RMD') || t.includes('DISTRIBUTION') || t.includes('MUNICIPAL')) {
            return 'tax';
        }
        return 'retirement';
    }

    // Modal DOM Structure
    function initModalDOM() {
        if (document.getElementById('calc-modal-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'calc-modal-overlay';
        overlay.id = 'calc-modal-overlay';
        overlay.innerHTML = `
            <div class="calc-modal-wrapper" role="dialog" aria-modal="true" aria-labelledby="calc-modal-title">
                <div class="calc-modal-header">
                    <div class="calc-modal-header-left">
                        <span class="calc-badge" id="calc-modal-badge">FINANCIAL PLANNING SUITE</span>
                        <h2 class="calc-modal-title" id="calc-modal-title">401(K) SAVINGS CALCULATOR</h2>
                    </div>
                    <button class="calc-close-btn" id="calc-close-btn" aria-label="Close Calculator">&times;</button>
                </div>
                <div class="calc-modal-body" id="calc-modal-body">
                    <!-- Populated dynamically -->
                </div>
                <div class="calc-modal-footer">
                    <div class="calc-footer-left">
                        <button type="button" class="calc-btn-reset" id="calc-reset-btn"><i class="fas fa-undo"></i> Reset Defaults</button>
                    </div>
                    <a href="contact.html" class="calc-btn-consult"><i class="fas fa-calendar-check"></i> Review With Our Wealth Advisors</a>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Close handlers
        document.getElementById('calc-close-btn').addEventListener('click', closeCalculatorModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeCalculatorModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeCalculatorModal();
            }
        });
    }

    // Render Calculator UI
    function renderCalculator(modelKey) {
        const model = MODELS[modelKey] || MODELS.retirement;
        const body = document.getElementById('calc-modal-body');
        if (!body) return;

        let html = `
            <div class="calc-notice">* Indicates required calculation parameter. Move sliders or enter values to project results.</div>
            
            <!-- Primary Section -->
            <div class="calc-accordion" id="acc-primary">
                <button type="button" class="calc-accordion-header" onclick="window.toggleCalcAccordion('acc-primary')">
                    <span>${model.title}</span>
                    <i class="fas fa-chevron-up chevron-icon"></i>
                </button>
                <div class="calc-accordion-content">
        `;

        // Render main fields
        model.fields.forEach(field => {
            html += renderFieldRow(field);
        });

        html += `
                </div>
            </div>

            <!-- Real-Time Results Section -->
            <div class="calc-results-summary" id="calc-results-box">
                <div class="calc-highlight-metric" id="calc-highlight-text">Calculating...</div>
                <div class="calc-metrics-grid" id="calc-metrics-container"></div>
            </div>
        `;

        // Render optional secondary section (e.g. Employer Match)
        if (model.matchSection) {
            html += `
                <div class="calc-accordion" id="acc-secondary">
                    <button type="button" class="calc-accordion-header" onclick="window.toggleCalcAccordion('acc-secondary')">
                        <span>${model.matchSection.title}</span>
                        <i class="fas fa-chevron-up chevron-icon"></i>
                    </button>
                    <div class="calc-accordion-content">
            `;
            model.matchSection.fields.forEach(field => {
                html += renderFieldRow(field);
            });
            html += `
                    </div>
                </div>
            `;
        }

        body.innerHTML = html;

        // Bind interactive events
        bindInputSync(model);
        recalculateAndRender(model);

        // Bind reset button
        const resetBtn = document.getElementById('calc-reset-btn');
        if (resetBtn) {
            resetBtn.onclick = () => {
                model.fields.forEach(f => setFieldValue(f, f.default));
                if (model.matchSection) {
                    model.matchSection.fields.forEach(f => setFieldValue(f, f.default));
                }
                recalculateAndRender(model);
            };
        }
    }

    function renderFieldRow(field) {
        const formattedVal = field.type === 'currency' ? formatCurrency(field.default) : (field.type === 'percent' ? formatPercent(field.default) : field.default);
        const tickSpans = field.ticks.map(t => `<span>${t}</span>`).join('');

        return `
            <div class="calc-field-row" data-field-id="${field.id}">
                <div class="calc-label-wrap">
                    <span class="calc-help-icon" title="Calculation factor for ${field.label}">?</span>
                    <label for="inp-${field.id}">${field.label}</label>
                </div>
                <div>
                    <input type="text" class="calc-input-box" id="inp-${field.id}" value="${formattedVal}" data-field-id="${field.id}">
                </div>
                <div class="calc-slider-wrap">
                    <input type="range" class="calc-slider" id="sld-${field.id}" min="${field.min}" max="${field.max}" step="${field.step}" value="${field.default}" data-field-id="${field.id}">
                    <div class="calc-slider-ticks">
                        ${tickSpans}
                    </div>
                </div>
            </div>
        `;
    }

    function setFieldValue(field, rawVal) {
        const sld = document.getElementById(`sld-${field.id}`);
        const inp = document.getElementById(`inp-${field.id}`);
        if (sld) sld.value = rawVal;
        if (inp) {
            inp.value = field.type === 'currency' ? formatCurrency(rawVal) : (field.type === 'percent' ? formatPercent(rawVal) : rawVal);
        }
    }

    function bindInputSync(model) {
        const allFields = [...model.fields, ...(model.matchSection ? model.matchSection.fields : [])];

        allFields.forEach(field => {
            const sld = document.getElementById(`sld-${field.id}`);
            const inp = document.getElementById(`inp-${field.id}`);

            if (sld && inp) {
                sld.addEventListener('input', () => {
                    const val = parseFloat(sld.value);
                    inp.value = field.type === 'currency' ? formatCurrency(val) : (field.type === 'percent' ? formatPercent(val) : val);
                    recalculateAndRender(model);
                });

                inp.addEventListener('change', () => {
                    const parsed = parseNumber(inp.value);
                    const clamped = Math.min(field.max, Math.max(field.min, parsed));
                    sld.value = clamped;
                    inp.value = field.type === 'currency' ? formatCurrency(clamped) : (field.type === 'percent' ? formatPercent(clamped) : clamped);
                    recalculateAndRender(model);
                });
            }
        });
    }

    function recalculateAndRender(model) {
        const allFields = [...model.fields, ...(model.matchSection ? model.matchSection.fields : [])];
        const currentVals = {};

        allFields.forEach(field => {
            const sld = document.getElementById(`sld-${field.id}`);
            currentVals[field.id] = sld ? parseFloat(sld.value) : field.default;
        });

        const results = model.calculate(currentVals);

        const highlightEl = document.getElementById('calc-highlight-text');
        if (highlightEl) {
            highlightEl.innerHTML = results.highlight;
        }

        const metricsContainer = document.getElementById('calc-metrics-container');
        if (metricsContainer && results.metrics) {
            metricsContainer.innerHTML = results.metrics.map(m => `
                <div class="calc-metric-card">
                    <span class="label">${m.label}</span>
                    <div class="value ${m.accent ? 'accent' : ''}">${m.value}</div>
                </div>
            `).join('');
        }
    }

    // Global Functions for Open / Close / Toggle
    window.openCalculatorModal = function (card) {
        initModalDOM();
        const title = card.getAttribute('data-title') || card.querySelector('h3')?.innerText || 'Interactive Financial Calculator';
        const category = card.getAttribute('data-category') || 'FINANCIAL PLANNING';

        activeCardTitle = title;
        activeCategory = category;
        activeType = determineModel(title);

        document.getElementById('calc-modal-badge').innerText = category.toUpperCase();
        document.getElementById('calc-modal-title').innerText = title.toUpperCase();

        renderCalculator(activeType);

        const overlay = document.getElementById('calc-modal-overlay');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeCalculatorModal = function () {
        const overlay = document.getElementById('calc-modal-overlay');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    window.toggleCalcAccordion = function (accId) {
        const acc = document.getElementById(accId);
        if (acc) {
            acc.classList.toggle('collapsed');
        }
    };

    // Attach click listeners to all calculator cards on page load
    document.addEventListener('DOMContentLoaded', () => {
        initModalDOM();

        document.querySelectorAll('.m-card[data-media="Calculators"], .m-calc-card').forEach(card => {
            const isVideo = card.classList.contains('m-video-card') || card.getAttribute('data-media') === 'Video';
            const isChecklist = card.getAttribute('data-media') === 'Checklist' || card.getAttribute('data-media') === 'Checklists';
            if (isVideo || isChecklist) return;

            const customHref = card.getAttribute('data-href');
            if (customHref) {
                // Card has a dedicated calculator page — allow direct navigation
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.calc-card-share-wrapper') || e.target.closest('.calc-card-share-btn')) {
                        return; // Allow share dropdown
                    }
                    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href') !== 'javascript:void(0)') {
                        return; // Let native link navigate
                    }
                    if (card.getAttribute('data-target') === '_blank' || customHref.startsWith('http')) {
                        window.open(customHref, '_blank');
                    } else {
                        window.location.href = customHref;
                    }
                });
                return;
            }

            // Fallback for cards without data-href: open generic modal
            card.addEventListener('click', (e) => {
                if (e.target.closest('.calc-card-share-wrapper')) return;
                e.preventDefault();
                e.stopPropagation();
                window.openCalculatorModal(card);
            });

            const startLink = card.querySelector('.m-card-footer a');
            if (startLink && (!startLink.getAttribute('href') || startLink.getAttribute('href') === 'javascript:void(0)')) {
                startLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.openCalculatorModal(card);
                });
            }
        });
    });

})();
