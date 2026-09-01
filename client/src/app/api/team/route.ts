import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest, canManageTeamMembers, hashPassword, UserRole, isAdminRole } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import { validateCsrfOrigin } from '@/lib/csrf';
import prisma from '@/lib/prisma';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'ACTIVE' | 'DISABLED';
  phone?: string;
  createdAt: string;
}

export const inMemoryTeamMembers: TeamMember[] = [
  { id: 'tm-1', name: 'Super Admin', email: 'admin@example.invalid', role: 'SUPER_ADMIN', status: 'ACTIVE', phone: '+1-555-0100', createdAt: new Date().toISOString() },
  { id: 'tm-2', name: 'Editorial Manager', email: 'demo-manager@example.invalid', role: 'MANAGER', status: 'ACTIVE', phone: '+1-555-0101', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'tm-3', name: 'Lead Editor', email: 'demo-editor@example.invalid', role: 'EDITOR', status: 'ACTIVE', phone: '+1-555-0102', createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 'tm-4', name: 'Finance Controller', email: 'demo-finance@example.invalid', role: 'FINANCE', status: 'ACTIVE', phone: '+1-555-0103', createdAt: new Date(Date.now() - 259200000).toISOString() },
];

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  if (!isAdminRole(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let members = [...inMemoryTeamMembers];
  try {
    if (prisma && (prisma as any).user) {
      const dbUsers = await (prisma as any).user.findMany({ orderBy: { createdAt: 'desc' } });
      if (dbUsers && dbUsers.length > 0) {
        members = dbUsers.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role as UserRole,
          status: (u.status as any) || 'ACTIVE',
          phone: u.phone || undefined,
          createdAt: u.createdAt.toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn('DB team query fallback:', err);
  }

  return NextResponse.json({ members });
}

export async function POST(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!canManageTeamMembers(user.role)) {
    return NextResponse.json(
      { error: 'Permission Denied. Only Super Admin can create or manage team members.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, password, role, phone } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Name, email, password, and role are required' }, { status: 400 });
    }

    if (String(password).length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: String(name).slice(0, 100).trim(),
      email: String(email).trim().toLowerCase(),
      role: role as UserRole,
      status: 'ACTIVE',
      phone: phone ? String(phone).slice(0, 30) : '',
      createdAt: new Date().toISOString(),
    };

    inMemoryTeamMembers.unshift(newMember);

    try {
      if (prisma && prisma.user) {
        await prisma.user.create({
          data: {
            name: newMember.name,
            email: newMember.email,
            passwordHash: hashedPassword,
            role: role as any,
            status: 'ACTIVE',
            phone: newMember.phone || null,
          },
        });
      }
    } catch (err) {
      console.warn('DB create team user warning:', err);
    }

    await recordActivityLog({
      userId: user.userId,
      userEmail: user.email,
      userRole: user.role,
      action: 'TEAM_MEMBER_CREATED',
      details: `Super Admin created team user "${newMember.name}" with role ${role}`,
    });

    return NextResponse.json({ success: true, member: newMember });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error creating member' }, { status: 500 });
  }
}
