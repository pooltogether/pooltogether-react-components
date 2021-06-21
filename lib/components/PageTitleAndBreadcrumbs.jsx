import React from 'react'
import classnames from 'classnames'

import { SECONDS_PER_DAY } from '@pooltogether/current-pool-data'
import { Chip } from './Containers/Chip'
import { TokenIcon } from './Icons'

// TODO: split into two components: 'PageTitle' and a separate 'Breadcrumbs'
export const PageTitleAndBreadcrumbs = (props) => {
  const { Link, t, breadcrumbs, title, pool, className, sizeClassName } = props

  const crumbJsx = (
    <div
      className={classnames(
        'flex flex-col items-start justify-between leading-none',
        sizeClassName,
        className
      )}
    >
      <div className='inline-block text-left text-xl sm:text-3xl font-bold text-accent-2 relative'>
        {title}
      </div>
      <div
        className='inline-block text-left text-caption-2 relative uppercase mt-3'
        style={{
          left: 1,
          bottom: 2
        }}
      >
        {breadcrumbs?.map((crumb, index) => (
          <span key={`crumb-${index}`}>
            {crumb.href && crumb.as ? (
              <>
                <Link href={crumb.href} as={crumb.as} shallow>
                  <a className='text-xxxs border-b border-accent-3'>{crumb.name}</a>
                </Link>
              </>
            ) : (
              <>
                <span className='text-xxxs'>{crumb.name}</span>
              </>
            )}
            {index + 1 !== breadcrumbs.length && <> &gt; </>}
          </span>
        ))}
      </div>
    </div>
  )

  const isDaily = pool?.prize?.prizePeriodSeconds == SECONDS_PER_DAY.toString()

  return (
    <>
      {pool ? (
        <div className='flex justify-start items-center'>
          <TokenIcon
            sizeClassName='w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18'
            address={pool.tokens.underlyingToken.address}
            chainId={pool.chainId}
          />

          <div className='ml-1 sm:ml-6'>{crumbJsx}</div>

          {typeof window !== 'undefined' &&
            window.location.pathname.match('/pools/') &&
            !pool.contract.isCommunityPool && (
              <div className='ml-4'>
                <Chip
                  bgClasses={isDaily ? 'bg-accent-grey-4' : 'bg-accent-grey-1'}
                  textClasses={isDaily ? 'text-highlight-6' : 'text-highlight-3'}
                  text={
                    isDaily
                      ? t?.('dailyPrize') || 'Daily Prize'
                      : t?.('prizeValue') || 'Weekly Prize'
                  }
                />
              </div>
            )}
        </div>
      ) : (
        crumbJsx
      )}
    </>
  )
}

PageTitleAndBreadcrumbs.defaultProps = {
  sizeClassName: 'w-full'
}

// return (
//   <>
//     {pool ? (
//       <>
//         <div className={classnames('flex justify-start items-center', className)}>
//           <PoolCurrencyIcon xl pool={pool} />

//           <div className='ml-1 sm:ml-6'>{crumbJsx}</div>

//           {Boolean(t) &&
//             typeof window !== 'undefined' &&
//             window.location.pathname.match('/pools/') && (
//               <div className='ml-4'>
//                 <Chip color='highlight-6' text={t(pool?.frequency?.toLowerCase())} />
//               </div>
//             )}
//         </div>
//       </>
//     ) : (
//       crumbJsx
//     )}
//   </>
// )
