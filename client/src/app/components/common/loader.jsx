import React from "react";

const Loader = () => {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0, 0.7)"
            }}
            className="d-flex justify-content-center align-items-center"
        >
            <span className="me-3 fs-2 fw-bold text-light">Loading...</span>
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    );
};

export default Loader;
