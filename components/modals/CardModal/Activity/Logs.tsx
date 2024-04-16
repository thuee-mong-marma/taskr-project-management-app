'use client'

import { AuditLog } from "@prisma/client"
import { LogItem } from "./LogItem"

interface CardLogsProps {
  data : AuditLog[]
}

const CardLogs = ({data} :CardLogsProps) => {
  console.log('audit logs', data)
  return (
    <div>
      <ol>
        {data.map((log, index) => (
          <LogItem key={index} data={log}/>
        ))}
      </ol>
    </div>
  )
}

export default CardLogs