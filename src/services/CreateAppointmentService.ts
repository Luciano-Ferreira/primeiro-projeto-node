import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [x]Recebimento da informações
 * [x]Tratativa de erros e exessões
 * [x]acesso ao repositório
 */

interface Request {
  provider: string;
  date: Date;
}
/**
 * Dependecy Inversion (SOLID)
 */
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
