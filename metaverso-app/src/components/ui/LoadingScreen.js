import React from 'react'

export const LoadingScreen = () => {
    return (
        <div className="auth__main ">
        <div class="spinner-border" role="status" style={{width: "4rem", height: "4rem"}} >
            <span class="sr-only">Loading...</span>
        </div>
        </div>
    )
}
