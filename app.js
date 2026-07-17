const mainInput = document.getElementById('main-input');
const sendBtn = document.getElementById('send-btn');

mainInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';

    const text = this.value.trim();
    if (text.length > 0) {
        sendBtn.classList.add('active');
    } else {
        sendBtn.classList.remove('active');
    }
});

sendBtn.addEventListener('click', function () {
    mainInput.value = '';
    mainInput.style.height = 'auto';
    sendBtn.classList.remove('active');
});

mainInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (this.value.trim().length > 0) {
            sendBtn.click();
        }
    }
});

const modals = [
    { cardId: 'bilanz-card', modalId: 'bilanz-modal', closeId: 'btn-close-bilanz' },
    { cardId: 'sparziele-card', modalId: 'sparziele-modal', closeId: 'btn-close-sparziele' },
    { cardId: 'smart-card', modalId: 'smart-modal', closeId: 'btn-close-smart' },
    { cardId: 'einnahmen-card', modalId: 'einnahmen-modal', closeId: 'btn-close-einnahmen' },
    { cardId: 'ausgaben-card', modalId: 'ausgaben-modal', closeId: 'btn-close-ausgaben' }
];

modals.forEach(item => {
    const card = document.getElementById(item.cardId);
    const modal = document.getElementById(item.modalId);
    const closeBtn = document.getElementById(item.closeId);

    if (card && modal) {
        card.addEventListener('click', function () {
            modal.classList.add('active');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            modal.classList.remove('active');
            const slider = modal.querySelector('.sheet-slider');
            if (slider) {
                slider.setAttribute('data-active-slide', '0');
            }
        });
    }
});

const profileTrigger = document.getElementById('profile-trigger');
const profileModal = document.getElementById('profile-modal');
const profileSlider = document.getElementById('profile-slider');
const appHeader = document.querySelector('.app-header');

if (profileTrigger && profileModal) {
    profileTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isActive = profileModal.classList.contains('active');
        if (isActive) {
            profileModal.classList.remove('active');
            if (appHeader) appHeader.classList.remove('profile-active');
            if (profileSlider) profileSlider.setAttribute('data-active-slide', '0');
        } else {
            profileModal.classList.add('active');
            if (appHeader) appHeader.classList.add('profile-active');
        }
    });
}

const btnToViewMode = document.getElementById('btn-to-view-mode');
const btnBackToProfile = document.getElementById('btn-back-to-profile');
const btnLightMode = document.getElementById('btn-light-mode');
const btnDarkMode = document.getElementById('btn-dark-mode');

if (btnToViewMode && profileSlider) {
    btnToViewMode.addEventListener('click', function() {
        profileSlider.setAttribute('data-active-slide', '1');
    });
}

const btnToApiKey = document.getElementById('btn-to-api-key');
if (btnToApiKey && profileSlider) {
    btnToApiKey.addEventListener('click', function() {
        profileSlider.setAttribute('data-active-slide', '2');
    });
}

if (btnBackToProfile && profileSlider) {
    btnBackToProfile.addEventListener('click', function() {
        profileSlider.setAttribute('data-active-slide', '0');
    });
}

const btnBackToProfileApi = document.getElementById('btn-back-to-profile-api');
if (btnBackToProfileApi && profileSlider) {
    btnBackToProfileApi.addEventListener('click', function() {
        profileSlider.setAttribute('data-active-slide', '0');
    });
}

if (btnLightMode) {
    btnLightMode.addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
    });
}

if (btnDarkMode) {
    btnDarkMode.addEventListener('click', function() {
        document.body.classList.add('dark-mode');
    });
}

document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            if (modal.id === 'profile-modal' && appHeader) {
                appHeader.classList.remove('profile-active');
            }
            const slider = modal.querySelector('.sheet-slider');
            if (slider) {
                slider.setAttribute('data-active-slide', '0');
            }
        }
    });
});

const btnEditBalance = document.getElementById('btn-edit-balance');
const btnSaveBalance = document.getElementById('btn-save-balance');
const bilanzSlider = document.getElementById('bilanz-slider');
const inputBalance = document.getElementById('input-balance');
const modalBalanceValue = document.getElementById('modal-balance-value');
const mainBalanceValue = document.getElementById('main-balance-value');

if (btnEditBalance && bilanzSlider) {
    btnEditBalance.addEventListener('click', function (e) {
        e.preventDefault();

        let currentVal = modalBalanceValue ? modalBalanceValue.textContent.replace('€', '').trim() : "0,00";
        currentVal = currentVal.replace(',', '.');

        if (inputBalance) {
            inputBalance.value = currentVal;
        }

        bilanzSlider.setAttribute('data-active-slide', '1');

        if (inputBalance) {
            setTimeout(() => {
                inputBalance.focus();
                inputBalance.select();
            }, 300);
        }
    });
}

if (btnSaveBalance && bilanzSlider) {
    btnSaveBalance.addEventListener('click', function (e) {
        e.preventDefault();

        if (inputBalance) {
            let newVal = inputBalance.value.trim();
            
            if (newVal === '') {
                newVal = '0,00';
            } else {
                newVal = newVal.replace('.', ',');
                if (!newVal.includes(',')) {
                    newVal = newVal + ',00';
                }
            }

            const finalValue = newVal + '€';

            if (modalBalanceValue) modalBalanceValue.textContent = finalValue;
            if (mainBalanceValue) mainBalanceValue.textContent = finalValue;
        }

        bilanzSlider.setAttribute('data-active-slide', '0');
    });
}

let savingGoals = [];
let currentEditingGoalId = null;
let currentEditingSourceId = null;

let incomeSources = [];
let expenseSources = [];
const sparzieleSlider = document.getElementById('sparziele-slider');
const btnToEditGoals = document.getElementById('btn-to-edit-goals');
const btnSaveGoalsEdit = document.getElementById('btn-save-goals-edit');
const btnToAddGoal = document.getElementById('btn-to-add-goal');
const btnCancelAddGoal = document.getElementById('btn-cancel-add-goal');
const btnSubmitGoal = document.getElementById('btn-submit-goal');

const inputGoalName = document.getElementById('input-goal-name');
const inputGoalPrice = document.getElementById('input-goal-price');
const addGoalHeaderTitle = document.getElementById('add-goal-header-title');
const btnSubmitGoalText = document.getElementById('btn-submit-goal-text');

const mainGoalsList = document.getElementById('main-goals-list');
const modalGoalsList = document.getElementById('modal-goals-list');
const modalGoalsListEdit = document.getElementById('modal-goals-list-edit');
const totalGoalAmount = document.getElementById('total-goal-amount');

function formatCurrency(value) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}

function renderGoals() {
    let totalSum = 0;
    let mainHtml = '';
    let modalHtml = '';

    savingGoals.forEach(goal => {
        totalSum += goal.price;
        const formattedPrice = formatCurrency(goal.price).replace(',00', '');
        const itemHtml = `
            <div class="goal-item" data-id="${goal.id}">
                <span class="goal-name">${goal.name}</span>
                <span class="goal-price" style="color: #000000;">${formatCurrency(goal.price).replace(',00', '')}</span>
            </div>
        `;
        mainHtml += itemHtml;
        modalHtml += itemHtml;
    });

    if (mainGoalsList) mainGoalsList.innerHTML = mainHtml;
    if (modalGoalsList) modalGoalsList.innerHTML = modalHtml;
    if (totalGoalAmount) totalGoalAmount.textContent = formatCurrency(totalSum);
}

function renderLists() {
    let incomeHtml = '';
    let totalIncome = 0;
    incomeSources.forEach(item => {
        totalIncome += item.amount;
        incomeHtml += `
            <div class="income-item">
                <span>${item.name}</span>
                <span class="price-green">+${item.amount.toFixed(2).replace('.', ',')}€</span>
            </div>
        `;
    });

    const mainIncomeList = document.getElementById('main-income-list');
    if (mainIncomeList) {
        mainIncomeList.innerHTML = incomeHtml + `
            <div class="card-divider"></div>
            <div class="income-total income-item">
                <span>Total Income</span>
                <span class="price-green">+${totalIncome.toFixed(2).replace('.', ',')}€</span>
            </div>
        `;
    }

    if(document.getElementById('modal-income-list')) document.getElementById('modal-income-list').innerHTML = incomeHtml;
    if(document.getElementById('modal-income-value')) document.getElementById('modal-income-value').textContent = `+${totalIncome.toFixed(2).replace('.', ',')}€`;

    updateIncomeChart();

    let expenseHtml = '';
    let totalExpense = 0;
    expenseSources.forEach(item => {
        totalExpense += item.amount;
        expenseHtml += `
            <div class="expense-item">
                <span>${item.name}</span>
                <span class="price-red">-${item.amount.toFixed(2).replace('.', ',')}€</span>
            </div>
        `;
    });

    const mainExpenseList = document.getElementById('main-expense-list');
    if (mainExpenseList) {
        mainExpenseList.innerHTML = expenseHtml + `
            <div class="card-divider"></div>
            <div class="expense-total expense-item">
                <span>Total Expenses</span>
                <span class="price-red">-${totalExpense.toFixed(2).replace('.', ',')}€</span>
            </div>
        `;
    }

    if(document.getElementById('modal-expense-list')) document.getElementById('modal-expense-list').innerHTML = expenseHtml;
    if(document.getElementById('modal-expense-value')) document.getElementById('modal-expense-value').textContent = `-${totalExpense.toFixed(2).replace('.', ',')}€`;
}

function renderEditLists(type) {
    const listEl = document.getElementById(type === 'income' ? 'modal-income-list-edit' : 'modal-expense-list-edit');
    const sources = type === 'income' ? incomeSources : expenseSources;

    let html = '';
    sources.forEach(item => {
        html += `
            <div class="item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
                <span>${item.name}</span>
                <div style="display: flex; gap: 10px;">
                    <button onclick="editSource('${type}', ${item.id})" style="border:none; background:none; cursor:pointer; color:#888;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path></svg>
                    </button>
                    <button onclick="deleteSource('${type}', ${item.id})" style="border:none; background:none; cursor:pointer; color:#d94141;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
        `;
    });
    listEl.innerHTML = html;
}

function renderGoalsEdit() {
    let editHtml = '';

    savingGoals.forEach(goal => {
        editHtml += `
            <div class="goal-item" style="justify-content: space-between; align-items: center; border-bottom: 1px solid #efefef; padding-bottom: 10px;">
                <span class="goal-name" style="font-weight: 500;">${goal.name}</span>
                <div class="goal-actions" style="display: flex; align-items: center;">
                    <button class="icon-btn-edit" data-id="${goal.id}" style="background: transparent; border: none; cursor: pointer; color: #888888; padding: 4px;">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
                        </svg>
                    </button>
                    <button class="icon-btn-delete" data-id="${goal.id}" style="background: transparent; border: none; cursor: pointer; color: #d94141; padding: 4px; margin-left: 12px;">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    });

    if (modalGoalsListEdit) {
        modalGoalsListEdit.innerHTML = editHtml;

        modalGoalsListEdit.querySelectorAll('.icon-btn-edit').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const goalId = parseInt(this.getAttribute('data-id'));
                openEditGoalForm(goalId);
            });
        });

        modalGoalsListEdit.querySelectorAll('.icon-btn-delete').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const goalId = parseInt(this.getAttribute('data-id'));
                deleteGoal(goalId);
            });
        });
    }
}

if (btnToEditGoals && sparzieleSlider) {
    btnToEditGoals.addEventListener('click', function () {
        renderGoalsEdit();
        sparzieleSlider.setAttribute('data-active-slide', '1');
    });
}

if (btnSaveGoalsEdit && sparzieleSlider) {
    btnSaveGoalsEdit.addEventListener('click', function () {
        renderGoals();
        sparzieleSlider.setAttribute('data-active-slide', '0');
    });
}

if (btnToAddGoal && sparzieleSlider) {
    btnToAddGoal.addEventListener('click', function (e) {
        if (e) e.preventDefault();
        currentEditingGoalId = null;
        if (inputGoalName) inputGoalName.value = '';
        if (inputGoalPrice) inputGoalPrice.value = '';
        if (addGoalHeaderTitle) addGoalHeaderTitle.textContent = 'Sparziel hinzufügen';
        if (btnSubmitGoalText) btnSubmitGoalText.textContent = 'Hinzufügen';

        sparzieleSlider.setAttribute('data-active-slide', '2');

        if (inputGoalName) {
            setTimeout(() => {
                inputGoalName.focus();
            }, 300);
        }
    });
}

function openEditGoalForm(id) {
    const goal = savingGoals.find(g => g.id === id);
    if (goal) {
        currentEditingGoalId = id;
        if (inputGoalName) inputGoalName.value = goal.name;
        if (inputGoalPrice) inputGoalPrice.value = goal.price;
        if (addGoalHeaderTitle) addGoalHeaderTitle.textContent = 'Sparziel bearbeiten';
        if (btnSubmitGoalText) btnSubmitGoalText.textContent = 'Speichern';

        sparzieleSlider.setAttribute('data-active-slide', '2');

        if (inputGoalName) {
            setTimeout(() => {
                inputGoalName.focus();
                inputGoalName.select();
            }, 300);
        }
    }
}

function deleteGoal(id) {
    savingGoals = savingGoals.filter(g => g.id !== id);
    renderGoalsEdit();
}

if (btnCancelAddGoal && sparzieleSlider) {
    btnCancelAddGoal.addEventListener('click', function () {
        sparzieleSlider.setAttribute('data-active-slide', '1');
    });
}

if (btnSubmitGoal && sparzieleSlider) {
    btnSubmitGoal.addEventListener('click', function () {
        const name = inputGoalName.value.trim();
        const priceStr = inputGoalPrice.value.trim();

        if (name === '' || priceStr === '') {
            alert('Please fill in all fields.');
            return;
        }

        const price = parseFloat(priceStr.replace(',', '.'));
        if (isNaN(price) || price <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        if (currentEditingGoalId !== null) {
            const goal = savingGoals.find(g => g.id === currentEditingGoalId);
            if (goal) {
                goal.name = name;
                goal.price = price;
            }
        } else {
            if (savingGoals.length >= 10) {
                alert('Maximum 10 savings goals allowed.');
                return;
            }
            const newId = savingGoals.length > 0 ? Math.max(...savingGoals.map(g => g.id)) + 1 : 1;

            let color = 'price-black';
            let prefix = '';
            savingGoals.push({
                id: newId,
                name: name,
                price: price,
                color: 'price-black',
                prefix: ''
            });
        }

        renderGoalsEdit();
        renderGoals();
        sparzieleSlider.setAttribute('data-active-slide', '1');
    });
}

renderGoals();

const incomeSlider = document.getElementById('einnahmen-slider');
const expenseSlider = document.getElementById('ausgaben-slider');

function updateIncomeChart() {
    const chartContainer = document.getElementById('income-circle');
    if (!chartContainer) return;

    if (incomeSources.length === 0) {
        chartContainer.style.display = 'none';
        return;
    }
    chartContainer.style.display = 'block';

    let total = incomeSources.reduce((sum, s) => sum + s.amount, 0);
    if (total === 0) return;

    let conicGradient = "conic-gradient(";
    let currentDeg = 0;
    const colors = ['#4a9e61', '#76c88f', '#2d5a3a', '#98d8a8', '#3e8e55'];

    incomeSources.forEach((source, index) => {
        let percent = (source.amount / total) * 360;
        let color = colors[index % colors.length];
        conicGradient += `${color} ${currentDeg}deg ${currentDeg + percent}deg${index === incomeSources.length - 1 ? '' : ', '}`;
        currentDeg += percent;
    });
    conicGradient += ")";

    chartContainer.style.background = conicGradient;
}

document.getElementById('btn-to-edit-income')?.addEventListener('click', () => { renderEditLists('income'); incomeSlider.setAttribute('data-active-slide', '1'); });
document.getElementById('btn-save-income-edit')?.addEventListener('click', () => { renderLists(); updateIncomeChart(); incomeSlider.setAttribute('data-active-slide', '0'); });
document.getElementById('btn-to-add-income')?.addEventListener('click', () => {
    if (incomeSources.length >= 5) {
        alert('Maximum 5 income sources allowed.');
        return;
    }
    currentEditingSourceId = null;
    document.getElementById('add-income-header-title').textContent = 'Add Income';
    document.getElementById('input-income-name').value = '';
    document.getElementById('input-income-amount').value = '';
    incomeSlider.setAttribute('data-active-slide', '2');
});
document.getElementById('btn-cancel-add-income')?.addEventListener('click', () => incomeSlider.setAttribute('data-active-slide', '1'));

document.getElementById('btn-to-edit-expense')?.addEventListener('click', () => { renderEditLists('expense'); expenseSlider.setAttribute('data-active-slide', '1'); });
document.getElementById('btn-save-expense-edit')?.addEventListener('click', () => { renderLists(); expenseSlider.setAttribute('data-active-slide', '0'); });
document.getElementById('btn-to-add-expense')?.addEventListener('click', () => {
    currentEditingSourceId = null;
    document.getElementById('add-expense-header-title').textContent = 'Add Expense';
    document.getElementById('input-expense-name').value = '';
    document.getElementById('input-expense-amount').value = '';
    expenseSlider.setAttribute('data-active-slide', '2');
});
document.getElementById('btn-cancel-add-expense')?.addEventListener('click', () => expenseSlider.setAttribute('data-active-slide', '1'));

window.editSource = (type, id) => {
    const source = (type === 'income' ? incomeSources : expenseSources).find(s => s.id === id);
    if (!source) return;
    currentEditingSourceId = id;
    const isIncome = type === 'income';
    document.getElementById(isIncome ? 'add-income-header-title' : 'add-expense-header-title').textContent = 'Edit';
    document.getElementById(isIncome ? 'input-income-name' : 'input-expense-name').value = source.name;
    document.getElementById(isIncome ? 'input-income-amount' : 'input-expense-amount').value = source.amount;
    (isIncome ? incomeSlider : expenseSlider).setAttribute('data-active-slide', '2');
};

window.deleteSource = (type, id) => {
    if (type === 'income') incomeSources = incomeSources.filter(s => s.id !== id);
    else expenseSources = expenseSources.filter(s => s.id !== id);
    renderLists();
    if(type === 'income') updateIncomeChart();
    renderEditLists(type);
};

document.getElementById('btn-submit-income')?.addEventListener('click', () => {
    const name = document.getElementById('input-income-name').value;
    const amount = parseFloat(document.getElementById('input-income-amount').value);

    if (currentEditingSourceId) {
        const index = incomeSources.findIndex(s => s.id === currentEditingSourceId);
        incomeSources[index] = { id: currentEditingSourceId, name, amount };
        currentEditingSourceId = null;
    } else {
        if (incomeSources.length >= 5) {
            alert('Maximum 5 income sources allowed.');
            return;
        }
        incomeSources.push({ id: Date.now(), name, amount });
    }
    renderLists();
    renderEditLists('income');
    updateIncomeChart();
    incomeSlider.setAttribute('data-active-slide', '1');
});

document.getElementById('btn-submit-expense')?.addEventListener('click', () => {
    const name = document.getElementById('input-expense-name').value;
    const amount = parseFloat(document.getElementById('input-expense-amount').value);

    if (currentEditingSourceId) {
        const index = expenseSources.findIndex(s => s.id === currentEditingSourceId);
        expenseSources[index] = { id: currentEditingSourceId, name, amount };
        currentEditingSourceId = null;
    } else {
        expenseSources.push({ id: Date.now(), name, amount });
    }
    renderLists();
    renderEditLists('expense');
    expenseSlider.setAttribute('data-active-slide', '1');
});

renderLists();
updateIncomeChart();