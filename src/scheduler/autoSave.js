const cron = require('node-cron');
const Goal = require('../models/Goal');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const ws = require('../ws');


// Cron job: run every day at 02:00 AM server time
// You can change schedule expression if you prefer timezone-aware solution (server time used).
function startAutoSaveJob() {
  // run daily at 02:00
  cron.schedule('0 2 * * *', async () => {
    console.log('Auto-save job started:', new Date());
    try {
      // find goals with autoSave enabled
      const goals = await Goal.find({ 'autoSave.enabled': true }).populate('owner');
      for (const g of goals) {
        const owner = await User.findById(g.owner._id);
        if (!owner) continue;
        // skip if emergency mode
        if (owner.emergencyMode) continue;
        const amount = Number(g.autoSave.amount) || 0;
        if (!amount || amount <= 0) continue;
        if (owner.balance < amount) continue; // skip if insufficient funds
        // transfer
        owner.balance -= amount;
        g.currentAmount += amount;
        g.autoSave.lastRun = new Date();
        await owner.save();
        await g.save();
        const tx = new Transaction({
          owner: owner._id,
          amount,
          type: 'debit',
          category: 'autosave',
          relatedGoal: g._id
        });
        await tx.save();
      }
    } catch (err) {
      console.error('Auto-save job error:', err);
    }
  }, { scheduled: true });
}

module.exports = startAutoSaveJob;

await tx.save();
ws.emitToUser(owner._id, 'goal:autosave', {
  goalId: g._id,
  amount,
  currentAmount: g.currentAmount,
  targetAmount: g.targetAmount,
  at: tx.createdAt || new Date()
});
