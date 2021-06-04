import { checkTransactionStatuses } from './checkTransactionStatuses'
import { TRANSACTIONS_KEY } from './constants'

// bring in new list of tx's from localStorage and check
// if any are ongoing & what their status is
export const readTransactions = (
  transactions,
  setTransactions,
  chainId,
  usersAddress,
  provider
) => {
  try {
    let txs = []
    if (typeof window !== 'undefined') {
      const storageKey = `${chainId}-${usersAddress.toLowerCase()}-${TRANSACTIONS_KEY}`

      txs = JSON.parse(localStorage.getItem(storageKey))
      txs = txs ? txs : []
    }

    txs = txs.filter((tx) => tx.sent && !tx.cancelled)

    // re-write IDs so transactions are ordered properly
    txs = txs.map((tx, index) => (tx.id = index + 1) && tx)

    setTransactions([...txs])
    checkTransactionStatuses(txs, provider, transactions, setTransactions)
  } catch (e) {
    console.error(e)
  }
}
