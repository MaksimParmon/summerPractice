import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function BasketItem({ item, onRemove }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{item.product.name}</h5>
        <p className="card-text">{item.product.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-light">
          <div className="row text-center">
            <div className="col-lg-4">
              <input
                name="basketID"
                className="form-control"
                value={1}
                type="number"
                readOnly
              />
            </div>
            <div className="col-lg-4">{item.product.price} руб.</div>
            <div className="col-lg-4">
              <button onClick={onRemove}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
