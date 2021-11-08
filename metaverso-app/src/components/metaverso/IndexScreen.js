import React from 'react'

export const IndexScreen = () => {
    return (
        <>
            <div className="border-bottom mt-2 mb-5">
                <h1 className="mt-2 mt-md-4 mb-3 ">Dashboard</h1>
            </div>

            <div className="index_screen">
                <div className="index_data">
                    <div className="index_data_i">
                        <div className="index_data_n">
                            <h1>4</h1>
                        </div>
                        <div className="index_data_d">
                            <h2>Usuarios</h2>
                        </div>
                    </div>
                    <div className="index_data_i">
                        <div className="index_data_n">
                            <h1>8</h1>
                        </div>
                        <div className="index_data_d">
                            <h2>Eventos</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
