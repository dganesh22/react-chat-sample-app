import React from 'react'

function Input() {
  return (
    <div className='form-group'>
        <div className="row">
            <div className="col-md-8 col-lg-10 col-sm-8 col-8">
                <input type="search" name="" id="" className="form-control" />
            </div>
            <div className="col-md-2 col-lg-1 col-sm-2 col-2">
                <label htmlFor="file" className='btn btn-warning'>
                        <i className="bi bi-upload"></i>
                </label>
                <input type="file" name="file" id="file" hidden />
            </div>
            <div className="col-md-2 col-lg-1 col-sm-2 col-2">
                <button className="btn btn-success"> <i className="bi bi-send"></i> </button>
            </div>
        </div>
    </div>
  )
}

export default Input