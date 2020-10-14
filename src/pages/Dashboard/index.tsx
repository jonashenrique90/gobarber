import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { Container, Header, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import 'react-day-picker/lib/style.css';


const months = ['Janeiro','Fevereiro','MArço','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

const Dashboard: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
		if (modifiers.available) {
			setSelectedDate(day);
		}

	},[]);

	const { signOut, user } = useAuth();
	return (
		<Container>
			<Header>
				<HeaderContent>
					<img src={logoImg} alt="GoBarbar"/>
					<Profile>
						<img src={user.avatar_url} alt={user.name}/>
						<div>
							<span>Bem vindo,</span>
							<strong>{user.name}</strong>
						</div>
					</Profile>
					<button type="button" onClick={signOut}>
						<FiPower></FiPower>
					</button>
				</HeaderContent>
			</Header>
			<Content>
				<Schedule>
					<h1>Horários agendados</h1>
					<p>
						<span>Hoje</span>
						<span>dia 06</span>
						<span> Segunda-feira</span>
					</p>
					<NextAppointment>
						<strong>Atendimento a seguir</strong>
						<div>
							<img src="https://avatars1.githubusercontent.com/u/29473398?s=460&u=fdb297b68d874cde5d1a69f3e53ab080c75cb174&v=4" alt="Jonas H"/>
							<strong>Jonas H</strong>
							<span>
								<FiClock>

								</FiClock>
								08:00
							</span>
						</div>
					</NextAppointment>
					<Section>
						<strong>Manhã</strong>
						<Appointment>
							<span>
								<FiClock></FiClock>
								08:00
							</span>
							<div>
								<img src="https://avatars1.githubusercontent.com/u/29473398?s=460&u=fdb297b68d874cde5d1a69f3e53ab080c75cb174&v=4" alt="Jonas H"/>
								<strong>Jonas H</strong>
							</div>
						</Appointment>
					</Section>
					<Section>
						<strong>Tarde</strong>
						<Appointment>
							<span>
								<FiClock></FiClock>
								08:00
							</span>
							<div>
								<img src="https://avatars1.githubusercontent.com/u/29473398?s=460&u=fdb297b68d874cde5d1a69f3e53ab080c75cb174&v=4" alt="Jonas H"/>
								<strong>Jonas H</strong>
							</div>
						</Appointment>
					</Section>
				</Schedule>
				<Calendar>
				<DayPicker 
				weekdaysShort={['D','S','T','Q','Q','S','S',]}
				fromMonth={new Date()}
				disabledDays={[{ daysOfWeek: [0,6]}]}
				modifiers={{
					available: { daysOfWeek: [1,2,3,4,5]},
				}}
				selectedDays={selectedDate}
				onDayClick={handleDateChange}
				months={months}
				>

				</DayPicker>
				</Calendar>
			</Content>
		</Container>
	)
}

export default Dashboard;
