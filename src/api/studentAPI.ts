import React from 'react';
import { ListParams, ListResponse, Student } from '../models';
import axiosClient from './axiosClient';

const studentAPI = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = '/students';
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },
  getByUserName(params: ListParams): Promise<Student[]> {
    const url = '/students';
    return axiosClient.get(url, { params });
  },
  add(data: Student): Promise<Student> {
    const url = '/students';
    return axiosClient.post(url, data);
  },
  update(data: Student): Promise<Student> {
    const url = '/students';
    return axiosClient.patch(url, data);
  },
  remove(id: string): Promise<any> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentAPI;
