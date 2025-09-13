"use client";
import React from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Divider,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useAppActions, useAppSelector } from "@/hooks";
import { getQuizStateField } from "@/selectors";

import { UserStats } from "@/entities/UserStats";
import { PlugForEmptyData } from "@/shared/ui/ui/Plug/PlugForEmptyData";
import { BtnGroupEdit } from "@/shared/ui/ui/btns";

import { iUser, UserRoles } from "@/types/staff.types";
import { TTypeModal } from "@/types/modal.types";
import clsx from "clsx";
import { getResultColor } from "@/shared/lib";

interface IUsersListItemProps {
	user: iUser;
	index: number;
	activeUser: boolean;
}

const UsersListItem = ({ user, index, activeUser }: IUsersListItemProps) => {
	const { openUserEditor } = useAppActions();

	const usersStats = useAppSelector(getQuizStateField("results"));
	const currStats = usersStats?.find((stat) => stat.username === user.username);

	const handelClickOnEdit = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		openUserEditor({
			type: TTypeModal.edit,
			editableUser: user,
		});
	};

	const handelClickOnDelete = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		openUserEditor({
			type: TTypeModal.delete,
			editableUser: user,
		});
	};

	const attemptClass = clsx(
		"flex h-full! w-fit! items-center justify-center rounded-full! px-3! py-1! text-xs! leading-none! font-bold!",
		{
			"bg-green-200! text-green-600!":
				!!user?.numberAttempts && user?.numberAttempts > 0,
			"bg-green-200! text-green-300!":
				!user?.numberAttempts || user?.numberAttempts === 0,
		},
	);

	const resultClass = clsx(
		"flex h-full! w-fit! items-center justify-center rounded-full! px-3! py-1! text-xs! leading-none! font-bold!",
		{
			"bg-emerald-200! text-emerald-900!":
				!!user?.lastResult && user?.lastResult >= 66,
			"bg-rose-200! text-rose-900!":
				!!user?.lastResult && user?.lastResult <= 50,
			"bg-orange-200! text-orange-900!":
				!!user?.lastResult && user?.lastResult > 50 && user?.lastResult < 66,
			"bg-green-200! text-green-300!": !user?.lastResult,
		},
	);

	return (
		<Accordion
			className="rounded-md! border-2! border-green-200! bg-green-50! shadow-sm!"
			sx={{
				"&:before": { display: "none !important" },
			}}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`UsersListItem-${user.username}`}
				id={`UsersListItem-${user.username}`}
				className="flex h-16! min-h-16! w-full! justify-between bg-green-100!"
				sx={{
					"& .MuiAccordionSummary-content": { margin: 0 },
				}}
			>
				<Box className="flex grow-1 items-center">
					<Typography className="me-2! flex h-6! w-6! items-center justify-center rounded-full! bg-green-300! text-xs! leading-none! font-bold! text-slate-800!">
						{index}
					</Typography>

					<Box className="flex w-full flex-row gap-1 me-3">
						<Box className="flex w-full flex-row gap-1">
							<Typography component="span" className="me-2!">
								{`${user.firstName} ${user.lastName}`}
							</Typography>

							{user.role !== UserRoles.Employee && (
								<Typography className="flex h-fit! w-fit! items-center justify-center rounded-full! bg-green-200! px-2! py-1! text-xs! leading-none! font-bold! text-green-600!">
									{user.role}
								</Typography>
							)}

							{activeUser && (
								<Typography
									component="span"
									className="flex h-fit! w-fit! items-center justify-center rounded-full! bg-green-200! px-2! py-1! text-xs! leading-none! font-bold! text-green-600!"
								>
									это вы
								</Typography>
							)}
						</Box>
						<Box className="flex w-fit flex-row shrink-0 gap-4">
							<Typography component="p" className={attemptClass}>
								Кол-во попыток:
								<Typography
									component="span"
									sx={{
										textAlign: "center",
										marginLeft: "2px",
										width: "20px",
										fontWeight: "inherit",
										fontSize: "inherit",
									}}
								>
									{user?.numberAttempts ?? 0}
								</Typography>
							</Typography>
							<Typography component="p" className={resultClass}>
								Последний результат:
								<Typography
									component="span"
									sx={{
										textAlign: "center",
										marginLeft: "2px",
										width: "20px",
										fontWeight: "inherit",
										fontSize: "inherit",
									}}
								>
									{user?.lastResult ?? "-"}
								</Typography>
							</Typography>
						</Box>
					</Box>
				</Box>
			</AccordionSummary>
			<AccordionDetails className="w-full!">
				<Box className="w-full!">
					<Box className="flex w-full! justify-between py-2! ps-6!">
						<Typography
							component="span"
							className="font-semibold! text-slate-500!"
						>
							Логин: {user.username}
						</Typography>
						<BtnGroupEdit
							onClickDelete={handelClickOnDelete}
							colorDelete="error"
							onClickEdit={handelClickOnEdit}
							colorEdit="success"
							size="small"
						/>
					</Box>
					<Divider />
				</Box>
				{!!currStats ? (
					<UserStats userStats={currStats} />
				) : (
					<PlugForEmptyData />
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default React.memo(UsersListItem);
