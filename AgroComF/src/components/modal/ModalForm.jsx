import React, { useState } from "react";
import { api } from "../../store/useStore";
import { t } from "i18next";

const ModalForm = ({ toggleModal }) => {
  const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      message: ''
    })
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
      message: '',
      success: true
    })
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsModalOpen(true);
      setLoading(true);
      try {
        const response = await api.post('/Contact', formData);
        setMessage(
          {
            message: 'Аризангиз муваффақиятли юборилди! Сиз билан менежерлар тез орада алоқага чиқадилар!',
            success: true
          }
        )
        console.log(response.data);
      } catch (error) {
        setMessage({
          message: 'Хатолик юз берди! Қайтадан уринб кўринг!',
          success: false
        })
        console.error("Хатолик юз берди! Қайтадан уринб кўринг!", error);
      }
      console.log("Yuborilgan ma'lumotlar:", formData);
      setLoading(false)
    };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-end">
          <button
            onClick={toggleModal}
            className="text-gray-500 hover:text-gray-700">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              {t("Contact.full_name")}
            </label>
            <input
              onChange={handleChange}
              name="name"
              value={formData.name}
              id="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium  text-gray-700">
              {t("Contact.phone")}
            </label>
            <input
              onChange={handleChange}
              name="phone"
              value={formData.phone}
              id="phone"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              {t("Contact.email")}
            </label>
            <input
              onChange={handleChange}
              name="email"
              value={formData.email}
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700">
              {t("Contact.message")}
            </label>
            <textarea
              onChange={handleChange}
              name="message"
              value={formData.message}
              id="message"
              rows="4"
              required
              className="mt-1 block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md"></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
            {t("Contact.send")}
          </button>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            {loading ? (
              <div>
                <p className="text-blue-500 font-semibold">Юборилмоқда...</p>
                <div className="mt-3 w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <p className={`${message.success ? 'text-green-500' : 'text-red-500'} font-semibold`}>{message.message}</p>
            )}
            {!loading && (
              <button
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-800 transition"
                onClick={() => (toggleModal(),setIsModalOpen(false))}
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
