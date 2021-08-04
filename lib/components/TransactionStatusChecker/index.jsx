import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useOnboard, readTransactions, transactionsAtom } from '@pooltogether/hooks'

export function TransactionStatusChecker(props) {
  const { transactionsKey } = props
  const [transactions, setTransactions] = useAtom(transactionsAtom)
  const { network: chainId, address: usersAddress, provider } = useOnboard()

  useEffect(() => {
    if (chainId && usersAddress && provider) {
      readTransactions(
        transactions,
        setTransactions,
        chainId,
        usersAddress,
        provider,
        transactionsKey
      )
    }
  }, [chainId, usersAddress, provider])

  return null
}
