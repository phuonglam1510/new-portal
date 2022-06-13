import {toAbsoluteUrl} from '../../../../_metronic/helpers'

export function LoginSocialOptions() {
  return (
    <>
      {/* begin::Google link */}
      <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
          className='h-20px me-3'
        />
        Continue with Google
      </a>
      {/* end::Google link */}

      {/* begin::Google link */}
      <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
          className='h-20px me-3'
        />
        Continue with Facebook
      </a>
      {/* end::Google link */}

      {/* begin::Google link */}
      <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
          className='h-20px me-3'
        />
        Continue with Apple
      </a>
      {/* end::Google link */}
    </>
  )
}
