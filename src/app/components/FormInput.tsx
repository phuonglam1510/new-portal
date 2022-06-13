import React from 'react'
import clsx from 'clsx'
import {useFormik} from 'formik'

interface Props {
  formik: ReturnType<typeof useFormik>
  disabled?: boolean
  label: string
  name: string
}

const FormInput: React.FC<Props> = ({formik, disabled = false, label, name}) => {
  return (
    <div className='fv-row mb-7'>
      {/* begin::Label */}
      <label className='required fw-bold fs-6 mb-2'>{label}</label>
      {/* end::Label */}

      {/* begin::Input */}
      <input
        placeholder={label}
        {...formik.getFieldProps(name)}
        type='text'
        name={name}
        className={clsx(
          'form-control form-control-solid mb-3 mb-lg-0',
          {'is-invalid': formik.touched[name] && formik.errors[name]},
          {
            'is-valid': formik.touched[name] && !formik.errors[name],
          }
        )}
        autoComplete='off'
        disabled={formik.isSubmitting || disabled}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors[name]}</span>
          </div>
        </div>
      )}
      {/* end::Input */}
    </div>
  )
}

export {FormInput}
