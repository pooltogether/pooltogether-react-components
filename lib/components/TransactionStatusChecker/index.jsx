import { useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { useOnboard } from '@pooltogether/hooks'

import { readTransactions } from './readTransactions'

// TODO: temporarily export from here so callTransaction can access it inside apps
export { updateTransaction } from './updateTransaction'

/**
 * TODO: Move all of this to a hook :D
 */
export const transactionsAtom = atom([])

export function TransactionStatusChecker(props) {
  const [transactions, setTransactions] = useAtom(transactionsAtom)
  const { network: chainId, address: usersAddress, provider } = useOnboard()

  useEffect(() => {
    if (chainId && usersAddress && provider) {
      readTransactions(transactions, setTransactions, chainId, usersAddress, provider)
    }
  }, [chainId, usersAddress, provider])

  return null
}
