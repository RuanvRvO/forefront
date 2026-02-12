"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Authenticated, Unauthenticated } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Calendar, Clock, MapPin, Video, Plus, Pencil, Trash2, X, Users, Check, XCircle } from "lucide-react";

type MeetingType = "Online" | "In-Person";
type TabType = "meetings" | "users";

interface MeetingFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: MeetingType;
  leader: string;
}

const emptyFormData: MeetingFormData = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  type: "In-Person",
  leader: "",
};

function MeetingModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing,
  isSaving,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MeetingFormData) => void;
  initialData: MeetingFormData;
  isEditing: boolean;
  isSaving: boolean;
}) {
  const [formData, setFormData] = useState<MeetingFormData>(initialData);

  // Parse time string like "10:00 AM - 2:00 PM" into components
  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      return {
        startHour: match[1], startMinute: match[2], startPeriod: match[3].toUpperCase(),
        endHour: match[4], endMinute: match[5], endPeriod: match[6].toUpperCase(),
      };
    }
    return { startHour: "9", startMinute: "00", startPeriod: "AM", endHour: "10", endMinute: "00", endPeriod: "AM" };
  };

  const [timeParts, setTimeParts] = useState(parseTime(initialData.time));

  useEffect(() => {
    const parts = parseTime(initialData.time);
    setTimeParts(parts);
    const timeStr = `${parts.startHour}:${parts.startMinute} ${parts.startPeriod} - ${parts.endHour}:${parts.endMinute} ${parts.endPeriod}`;
    setFormData({ ...initialData, time: timeStr });
  }, [initialData]);

  const updateTime = (parts: typeof timeParts) => {
    setTimeParts(parts);
    const timeStr = `${parts.startHour}:${parts.startMinute} ${parts.startPeriod} - ${parts.endHour}:${parts.endMinute} ${parts.endPeriod}`;
    setFormData((prev) => ({ ...prev, time: timeStr }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {isEditing ? "Edit Meeting" : "Add New Meeting"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="Meeting title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Meeting description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Start Time
            </label>
            <div className="flex gap-2">
              <select
                value={timeParts.startHour}
                onChange={(e) => updateTime({ ...timeParts, startHour: e.target.value })}
                className="flex-1 px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={String(h)}>{h}</option>
                ))}
              </select>
              <select
                value={timeParts.startMinute}
                onChange={(e) => updateTime({ ...timeParts, startMinute: e.target.value })}
                className="flex-1 px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              >
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={timeParts.startPeriod}
                onChange={(e) => updateTime({ ...timeParts, startPeriod: e.target.value })}
                className="flex-1 px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              End Time
            </label>
            <div className="flex gap-2">
              <select
                value={timeParts.endHour}
                onChange={(e) => updateTime({ ...timeParts, endHour: e.target.value })}
                className="flex-1 px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={String(h)}>{h}</option>
                ))}
              </select>
              <select
                value={timeParts.endMinute}
                onChange={(e) => updateTime({ ...timeParts, endMinute: e.target.value })}
                className="flex-1 px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              >
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={timeParts.endPeriod}
                onChange={(e) => updateTime({ ...timeParts, endPeriod: e.target.value })}
                className="flex-1 px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="Meeting location or link"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="In-Person"
                  checked={formData.type === "In-Person"}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as MeetingType })}
                  className="w-4 h-4 text-amber-600"
                />
                <span className="text-slate-700 dark:text-slate-300">In-Person</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="Online"
                  checked={formData.type === "Online"}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as MeetingType })}
                  className="w-4 h-4 text-amber-600"
                />
                <span className="text-slate-700 dark:text-slate-300">Online</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Meeting Leader
            </label>
            <input
              type="text"
              value={formData.leader}
              onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              placeholder="Who is leading this meeting?"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Add Meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  meetingTitle,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  meetingTitle: string;
  isDeleting: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 text-center mb-2">
            Delete Meeting
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
            Are you sure you want to delete &quot;{meetingTitle}&quot;? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MeetingsManager() {
  const meetings = useQuery(api.meetings.listMeetings) ?? [];
  const addMeeting = useMutation(api.meetings.addMeeting);
  const updateMeeting = useMutation(api.meetings.updateMeeting);
  const deleteMeeting = useMutation(api.meetings.deleteMeeting);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Id<"meetings"> | null>(null);
  const [deletingMeeting, setDeletingMeeting] = useState<{ id: Id<"meetings">; title: string } | null>(null);
  const [formData, setFormData] = useState<MeetingFormData>(emptyFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAdd = () => {
    setEditingMeeting(null);
    setFormData(emptyFormData);
    setIsModalOpen(true);
  };

  const handleEdit = (meeting: typeof meetings[0]) => {
    setEditingMeeting(meeting._id);
    setFormData({
      title: meeting.title,
      description: meeting.description,
      date: meeting.date,
      time: meeting.time,
      location: meeting.location,
      type: meeting.type,
      leader: meeting.leader ?? "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (meeting: typeof meetings[0]) => {
    setDeletingMeeting({ id: meeting._id, title: meeting.title });
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (data: MeetingFormData) => {
    setIsSaving(true);
    try {
      if (editingMeeting) {
        await updateMeeting({
          id: editingMeeting,
          ...data,
        });
      } else {
        await addMeeting(data);
      }
      setIsModalOpen(false);
      setEditingMeeting(null);
      setFormData(emptyFormData);
    } catch (error) {
      console.error("Error saving meeting:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingMeeting) return;
    setIsDeleting(true);
    try {
      await deleteMeeting({ id: deletingMeeting.id });
      setIsDeleteModalOpen(false);
      setDeletingMeeting(null);
    } catch (error) {
      console.error("Error deleting meeting:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-ZA", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    return timeStr;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Meetings</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {meetings.length} meeting{meetings.length !== 1 ? "s" : ""} scheduled
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Meeting
        </button>
      </div>

      {meetings.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h4 className="text-slate-800 dark:text-slate-200 font-medium mb-2">No meetings yet</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Get started by adding your first meeting.
          </p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Meeting
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {meetings.map((meeting) => (
            <div
              key={meeting._id}
              className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {meeting.title}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                        meeting.type === "Online"
                          ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {meeting.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {meeting.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(meeting.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {formatTime(meeting.time)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {meeting.type === "Online" ? (
                        <Video className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                      {meeting.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                    <Users className="w-4 h-4" />
                    {meeting.leader || "Undecided"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(meeting)}
                      className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                      title="Edit meeting"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(meeting)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete meeting"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <MeetingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMeeting(null);
          setFormData(emptyFormData);
        }}
        onSave={handleSave}
        initialData={formData}
        isEditing={!!editingMeeting}
        isSaving={isSaving}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingMeeting(null);
        }}
        onConfirm={handleConfirmDelete}
        meetingTitle={deletingMeeting?.title ?? ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}

function UserManagement() {
  const pendingUsers = useQuery(api.userApproval.listPendingUsers) ?? [];
  const allUsers = useQuery(api.userApproval.listAllUsers) ?? [];
  const approveUser = useMutation(api.userApproval.approveUserFromAdmin);
  const declineUser = useMutation(api.userApproval.declineUserFromAdmin);

  const [processingId, setProcessingId] = useState<Id<"pendingUsers"> | null>(null);

  const handleApprove = async (userId: Id<"pendingUsers">) => {
    setProcessingId(userId);
    try {
      await approveUser({ pendingUserId: userId });
    } catch (error) {
      console.error("Error approving user:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDecline = async (userId: Id<"pendingUsers">) => {
    setProcessingId(userId);
    try {
      await declineUser({ pendingUserId: userId });
    } catch (error) {
      console.error("Error declining user:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const approvedUsers = allUsers.filter((u) => u.status === "approved");
  const declinedUsers = allUsers.filter((u) => u.status === "declined");

  return (
    <div className="space-y-6">
      {/* Pending Users */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Pending Requests</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {pendingUsers.length} user{pendingUsers.length !== 1 ? "s" : ""} waiting for approval
              </p>
            </div>
          </div>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">No pending requests</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {pendingUsers.map((user) => (
              <div key={user._id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{user.email}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Requested: {formatDate(user.requestedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(user._id)}
                    disabled={processingId === user._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(user._id)}
                    disabled={processingId === user._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Users */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Approved Users</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {approvedUsers.length} user{approvedUsers.length !== 1 ? "s" : ""} with access
          </p>
        </div>

        {approvedUsers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">No approved users</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {approvedUsers.map((user) => (
              <div key={user._id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{user.email}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Approved: {user.reviewedAt ? formatDate(user.reviewedAt) : "Auto-approved (first user)"}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                  Approved
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Declined Users */}
      {declinedUsers.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Declined Users</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {declinedUsers.length} user{declinedUsers.length !== 1 ? "s" : ""} declined
            </p>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {declinedUsers.map((user) => (
              <div key={user._id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{user.email}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Declined: {user.reviewedAt ? formatDate(user.reviewedAt) : "N/A"}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
                  Declined
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AdminContent() {
  const router = useRouter();
  const approvalStatus = useQuery(api.userApproval.getUserApprovalStatus);
  const pendingUsers = useQuery(api.userApproval.listPendingUsers) ?? [];
  const { signOut } = useAuthActions();
  const [activeTab, setActiveTab] = useState<TabType>("meetings");

  useEffect(() => {
    // If not approved, redirect to signin
    if (approvalStatus !== undefined) {
      if (!approvalStatus || approvalStatus.status !== "approved") {
        router.push("/signin");
      }
    }
  }, [approvalStatus, router]);

  // Show loading while checking status
  if (approvalStatus === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-slate-600 dark:text-slate-400">Loading...</div>
      </div>
    );
  }

  // If not approved, show nothing (redirect will happen)
  if (!approvalStatus || approvalStatus.status !== "approved") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-slate-600 dark:text-slate-400">Redirecting...</div>
      </div>
    );
  }

  // User is approved - show admin panel
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                Forefront Admin
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {approvalStatus.email}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("meetings")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "meetings"
                  ? "border-amber-500 text-amber-600 dark:text-amber-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Meetings
              </span>
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "users"
                  ? "border-amber-500 text-amber-600 dark:text-amber-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                User Management
                {pendingUsers.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
                    {pendingUsers.length}
                  </span>
                )}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "meetings" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Meetings Management
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Add, edit, or remove meetings that appear on the landing page.
              </p>
            </div>
            <MeetingsManager />
          </>
        )}

        {activeTab === "users" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                User Management
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Approve or decline user access requests.
              </p>
            </div>
            <UserManagement />
          </>
        )}
      </main>
    </div>
  );
}

function UnauthenticatedContent() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signin");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-slate-600 dark:text-slate-400">Redirecting to sign in...</div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <>
      <Unauthenticated>
        <UnauthenticatedContent />
      </Unauthenticated>
      <Authenticated>
        <AdminContent />
      </Authenticated>
    </>
  );
}
