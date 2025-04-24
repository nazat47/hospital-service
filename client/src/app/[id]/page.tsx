"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Services = () => {
  const { id } = useParams();
  const [services, setServices] = React.useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL!}/api/v1/services/${id}`
        ).then((res) => res.json());
        setServices(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  const bookAppointment = async (serviceId: string) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL!}/appointments/${serviceId}`,
        {},
        { withCredentials: true }
      );
      console.log(data);
      alert("apointment booked");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        Hostpital : {services?.[0]?.hospital.name}
      </h1>
      <h1 className="text-3xl font-bold mb-6">Services</h1>
      <div className="p-3 rounded-lg border border-stone-200 flex flex-col gap-6 max-w-md">
        {services.map((service: any, i: number) => (
          <div
            key={i}
            className="flex justify-between gap-6 cursor-pointer hover:bg-stone-200"
          >
            <div>
              <h2 className="text-xl font-bold">{service.name}</h2>
              <p className="text-sm">{service.description}</p>
            </div>
            <button
              onClick={() => bookAppointment(service.id)}
              className="p-2 bg-emerald-600 rounded-lg text-white cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
