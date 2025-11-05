import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Obtener el total de usuarios en la waitlist
    const totalUsers = await prisma.waitlistUser.count();

    // Si no hay usuarios, devolver datos vacíos
    if (totalUsers === 0) {
      return NextResponse.json({
        totalUsers: 0,
        chartData: [],
      });
    }

    // Obtener todos los usuarios ordenados por fecha de creación
    const users = await prisma.waitlistUser.findMany({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Agrupar usuarios por fecha (solo día, sin hora)
    const usersByDate = new Map<string, number>();

    users.forEach(user => {
      const dateKey = new Date(user.createdAt).toISOString().split("T")[0];
      usersByDate.set(dateKey, (usersByDate.get(dateKey) || 0) + 1);
    });

    // Convertir a array y calcular el acumulado
    const chartData: { date: string; count: number; total: number }[] = [];
    let runningTotal = 0;

    // Ordenar fechas y crear datos acumulados
    const sortedDates = Array.from(usersByDate.keys()).sort();

    sortedDates.forEach(date => {
      const count = usersByDate.get(date) || 0;
      runningTotal += count;
      chartData.push({
        date,
        count,
        total: runningTotal,
      });
    });

    // Si solo hay un punto de datos, agregar un punto anterior con 0 para que se vea una línea
    if (chartData.length === 1) {
      const firstDate = new Date(chartData[0].date);
      firstDate.setDate(firstDate.getDate() - 1);
      chartData.unshift({
        date: firstDate.toISOString().split("T")[0],
        count: 0,
        total: 0,
      });
    }

    return NextResponse.json({
      totalUsers,
      chartData,
    });
  } catch (error) {
    console.error("Error fetching waitlist metrics:", error);
    // Si hay error (por ejemplo, la tabla no existe), devolver datos vacíos
    return NextResponse.json({
      totalUsers: 0,
      chartData: [],
    });
  }
}
