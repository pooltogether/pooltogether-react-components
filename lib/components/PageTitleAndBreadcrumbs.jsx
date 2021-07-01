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
      <div className='inline-block text-left text-accent-2 font-inter relative uppercase mt-3 font-normal opacity-80 hover:opacity-100 trans'>
        {breadcrumbs?.map((crumb, index) => (
          <span className='text-xxxs sm:text-xxs' key={`crumb-${index}`}>
            {crumb.href && crumb.as ? (
              <Link href={crumb.href} as={crumb.as} shallow>
                <a className='text-xxxs sm:text-xxs border-b border-secondary hover:text-accent-3'>
                  {crumb.name}
                </a>
              </Link>
            ) : (
              crumb.name
            )}
            {index + 1 !== breadcrumbs.length && (
              <>
                {' '}
                <span className='text-accent-4 opacity-70 mx-1 font-bold'>&gt;</span>{' '}
              </>
            )}
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
            sizeClassName='w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 mr-2'
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
