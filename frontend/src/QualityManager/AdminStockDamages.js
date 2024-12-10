import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminStockDamages = () => {
  const [productID, setProductID] = useState("");
  const [damage, setDamage] = useState("");
  const [message, setMessage] = useState("");
  const [stockDamages, setStockDamages] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [updateID, setUpdateID] = useState(null);
  const [updateProductID, setUpdateProductID] = useState("");
  const [updateDamage, setUpdateDamage] = useState("");

  useEffect(() => {
    fetchStockDamages();
  }, []);

  const fetchStockDamages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/stockDamage/all");
      setStockDamages(response.data);
    } catch (error) {
      console.error("Error fetching stock damages:", error);
    }
  };

  const handleProductIDChange = (e) => {
    setProductID(e.target.value);
  };

  const handleDamageChange = (e) => {
    setDamage(e.target.value);
  };

  const handleUpdateProductIDChange = (e) => {
    setUpdateProductID(e.target.value);
  };

  const handleUpdateDamageChange = (e) => {
    setUpdateDamage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/stockDamage/add", {
        productID,
        damage,
      });
      setMessage(response.data);
      setProductID("");
      setDamage("");
      fetchStockDamages();
    } catch (error) {
      console.error("Error adding stock damage:", error);
      setMessage("An error occurred while adding stock damage.");
    }
  };

  const handleUpdate = (id, productID, damage) => {
    setUpdateID(id);
    setUpdateProductID(productID);
    setUpdateDamage(damage);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000/stockDamage/update/${updateID}`, {
        productID: updateProductID,
        damage: updateDamage,
      });
      setMessage(response.data);
      setUpdateID(null);
      fetchStockDamages();
    } catch (error) {
      console.error("Error updating stock damage:", error);
      setMessage("An error occurred while updating stock damage.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/stockDamage/delete/${id}`);
        setStockDamages(stockDamages.filter((damage) => damage._id !== id));
        setMessage("Stock damage deleted successfully.");
      } catch (error) {
        console.error("Error deleting stock damage:", error);
        setMessage("An error occurred while deleting stock damage.");
      }
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={toggleFormVisibility} style={{ border: "3px solid green", marginTop: "30px" }}>
        {formVisible ? "Hide Form" : "Add Damaged Product"}
      </button>
      {formVisible && (
        <div style={{ border: "2px solid green", padding: "30px", marginTop: "10px", borderRadius: "10px", marginLeft: "20px", marginRight: "20px" }}>
          <h2 style={{ color: "green", marginBottom: "20px" }}>Add Stock Damages</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="productID" style={{ marginRight: "10px", fontWeight: "bold" }}>Product ID:</label>
              <input
                type="text"
                id="productID"
                value={productID}
                onChange={handleProductIDChange}
                style={{ width: "250px", padding: "8px", borderRadius: "5px", border: "1px solid green" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="damage" style={{ marginRight: "10px", fontWeight: "bold" }}>Damage:</label>
              <input
                type="text"
                id="damage"
                value={damage}
                onChange={handleDamageChange}
                style={{ width: "250px", padding: "8px", borderRadius: "5px", border: "1px solid green" }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: "green", border: "none", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Submit</button>
          </form>
          {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}
        </div>
      )}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ color: "green" }}>All Stock Damages</h2>
        <table style={{ borderCollapse: "collapse", width: "80%", margin: "0 auto" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid green", padding: "10px", backgroundColor: "lightgreen" }}>Product ID</th>
              <th style={{ border: "1px solid green", padding: "10px", backgroundColor: "lightgreen" }}>Damage</th>
              <th style={{ border: "1px solid green", padding: "10px", backgroundColor: "lightgreen" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockDamages.map((damage, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid green", padding: "10px" }}>{damage.productID}</td>
                <td style={{ border: "1px solid green", padding: "10px" }}>{damage.damage}</td>
                <td style={{ border: "1px solid green", padding: "10px" }}>
                  <button onClick={() => handleUpdate(damage._id, damage.productID, damage.damage)} style={{ backgroundColor: "green", color: "white", border: "none", borderRadius: "5px", padding: "5px 10px", marginRight: "5px", cursor: "pointer" }}>Update</button>
                  <button onClick={() => handleDelete(damage._id)} style={{ backgroundColor: "green", color: "white", border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {updateID !== null && (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor
        : "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "50%", maxWidth: "500px" }}>
          <h2 style={{ color: "green", marginBottom: "20px" }}>Update Stock Damage</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="updateProductID" style={{ marginRight: "10px", fontWeight: "bold" }}>Product ID:</label>
              <input
                type="text"
                id="updateProductID"
                value={updateProductID}
                onChange={handleUpdateProductIDChange}
                style={{ width: "250px", padding: "8px", borderRadius: "5px", border: "1px solid green" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="updateDamage" style={{ marginRight: "10px", fontWeight: "bold" }}>Damage:</label>
              <input
                type="text"
                id="updateDamage"
                value={updateDamage}
                onChange={handleUpdateDamageChange}
                style={{ width: "250px", padding: "8px", borderRadius: "5px", border: "1px solid green" }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: "green", border: "none", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Submit</button>
          </form>
        </div>
      </div>
    )}
  </div>
);
};

export default AdminStockDamages;
